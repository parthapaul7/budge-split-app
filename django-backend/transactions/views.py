from django.contrib.auth.models import User

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Transaction,Has
from .serializers import TransactionSerializer,HasSerializer


# fucntion to splite the amount privice none/null if not present 
def split_amount(total, n, *amounts):
    # convert everything to number
    total = float(total)
    converted_amounts = []

    for i in range(len(amounts)):
        if amounts[i] is not None:
            converted_amounts.append(float(amounts[i]))
        else:
            converted_amounts.append(None)

    print(converted_amounts)
    split_list = []
    i=0
    it=0
    remaining = total
    for amount in converted_amounts:
        if(amount is not None):
            split_list.append(amount)
            remaining -= amount
            it+=1
        else:
            split_list.append(0)
        i+=1

    if remaining > 0 and n-it > 0:
        # Calculate the amount to be split evenly
        evenly_split_amount = remaining / (n-it)

        for i in range(n):
            if split_list[i] == 0:
                split_list[i] = evenly_split_amount 

    return split_list

# print(split_amount(100, 3, None, 20 , None))


class TransactionViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def list(self, request):
        # temp = Transaction.objects.filter(id__in=Has.objects.filter(user_id=request.user.id).values('transaction_id'))
        hasTemp = Has.objects.filter(user_id=request.user.id)
        has = HasSerializer(hasTemp, many=True)
        # transaction = TransactionSerializer(temp, many=True)
        # print(transaction)

        return Response({
            "status":"success",
            "transactions":has.data,
        }) 


    # create method override
    def create(self, request, *args, **kwargs):

        if len(request.data['usernames']) is 0:
            return Response({"status":"fail","message":"no users selected"})
        trans = Transaction(name=request.data['name'], amount=request.data['amount'], category=request.data['category'])
        n = len(request.data['usernames'])
        args = request.data['splits']
        print(n,args)
        splits = split_amount(request.data['amount'],len(args),*args)
        trans.save()

        print(splits,"the splitted amount")
        primaryKey = str(request.user.id)+"@"+str(trans.id)
        # has = Has(paid=splits[0],pKey=primaryKey,user_id=User.objects.get(username=request.user), transaction_id=trans)
        # has.save()

        # print(has)

        it=0
        for users in request.data['usernames']:
            user_id = User.objects.get(username=users)
            # generate unique has primary key
            primaryKey = str(user_id.id)+"@"+str(trans.id)
            has = Has(paid=splits[it],pKey=primaryKey, user_id=user_id, transaction_id=trans)
            has.save()
            print(has)
            it+=1
        return Response({"messge":"success","trans_id":trans.id})
    
    def update(self, request, *args, **kwargs):

        for users in request.data['usernames']:
            user_id = User.objects.get(username=users)
            trans = Transaction.objects.get(id=kwargs['pk'])

            # generate unique has primary key

            primaryKey = str(user_id.id)+"@"+str(kwargs['pk'])
            try:
                has = Has(pKey=primaryKey, user_id=user_id, transaction_id=trans)
                has.save()
            except:
                pass

        return Response({"status":"success","usernames":request.data['usernames']}) 