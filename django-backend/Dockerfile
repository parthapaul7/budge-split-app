# base image  
FROM python:3.10  
# setup environment variable  
ENV DockerHOME=/home/app/webapp  
ENV PYTHONUNBUFFERED=1

# set work directory  
RUN mkdir -p $DockerHOME  

# where your code lives  
WORKDIR $DockerHOME  

# install dependencies  
# RUN pip install --upgrade pip  

# copy whole project to your docker home directory. 
COPY . $DockerHOME  
# ru this command to install all dependencies  
RUN pip install -r requirements.txt  
# port where the Django app runs  
EXPOSE 8000  
# start server  
# CMD python manage.py runserver 