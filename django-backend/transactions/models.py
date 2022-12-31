from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Transaction(models.Model):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.name+"@"+str(self.id)

class Has(models.Model):
    pKey = models.CharField(max_length=100,primary_key=True)
    transaction_id = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User , on_delete=models.CASCADE)
    paid = models.DecimalField(max_digits=10, decimal_places=2)
