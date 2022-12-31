from rest_framework import serializers
from .models import Has, Transaction
from django.utils.timezone import now


class TransactionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Transaction 
        fields = ['id', 'name', 'amount', 'date', 'category'] 



class HasSerializer(serializers.ModelSerializer):

    transactions= serializers.SerializerMethodField()

    class Meta:
        model = Has
        fields = "__all__"

    def get_transactions(self,obj):
        try:
            data = TransactionSerializer(Transaction.objects.get(id=obj.transaction_id.id))
            return data.data
        except:
            return None

    

