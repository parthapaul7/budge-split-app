from django.contrib import admin

# Register your models here.
#register transaction and has model
from .models import Transaction,Has

admin.site.register(Has)
admin.site.register(Transaction)

