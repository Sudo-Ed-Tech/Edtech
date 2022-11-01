
<!-- (https://github.com/Sudo-Ed-Tech/Edtech/blob/main/lms_frontend/public/logown.png) -->
<p align="center">
<a href="https://github.com/Sudo-Ed-Tech/Edtech" target="_blank"> 
    <img src="https://github.com/Sudo-Ed-Tech/Edtech/blob/main/lms_frontend/public/logown.png"> 
  </a> 
</p>

# Ed-Tech



<h3 align="left">Languages and Tools:</h3>
<p align="left"> 
  <a href="https://bestofreactjs.com/" target="_blank"> 
    <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" alt="c" width="40" height="40"/> 
  </a>
  <a href="https://www.npmjs.com/" target="_blank"> 
    <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" alt="c" width="40" height="40"/> 
  </a>
  <a href="https://www.w3schools.com/css/" target="_blank"> 
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> 
  </a> 
  <a href="https://www.python.org/" target="_blank"> 
  <img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" alt="css3" width="40" height="40"/> 
  </a> 
  <a href="https://www.djangoproject.com/" target="_blank"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-original.svg" alt="django" width="40" height="40"/> 
  <a href="https://git-scm.com/" target="_blank"> 
    <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
  </a> 
  <a href="https://www.w3.org/html/" target="_blank"> 
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>  
</p>

### Features
**Modules**
1. eLearning
2. Corporate Training

**eLearning modules** </br>
1.Teacher 
	 - Courses
		- Create
		- Update
		- Delete
	- Chapters
		- Create
		- Update
		- Delete
	- Enlolled Student
		- View
2. Student
	- Course
		- Enroll
		- Rate
		- Like
	- Teacher Details
		- View
3. Course
	- Chapters
	- Enrollement
	- Like
	- Rate 

**Corporate Training**
1. Course Creator
- Training Courses
	- Create
	- Update
	- Delete
	- Assign Trainer
2. Trainer
	- Training the course
	- Trainee Attendance
3. Student/Trainee
	- Attend training Meeting
	- Or Watch the recording
4. Training Session
	- Topic Name
	- Time
	- Date
	- Meeting Link
	- Trainer details
5. Training Recording
	- Topic Name
	- Time
	- Date
	- Session Note
	- Session Recording

### Project Installation and Setup
**Step 00:** _Requirements Need to be installed before Setup_
1. Git
2. Python
3. NPM
<p align="left">
	<a href="https://www.npmjs.com/" target="_blank">
		<img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" alt="c" width="40" height="40"/> 
	</a>
	<a href="https://www.python.org/" target="_blank"> 
  		<img src="https://github.com/devicons/devicon/blob/master/icons/python/python-original.svg" alt="css3" width="40" height="40"/> 
  	</a>
	<a href="https://git-scm.com/" target="_blank"> 
   		 <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> 
  	</a> 
</p>

**Step 01:** _Clone the repository_

**Step 02:** _Open the repository in any text editor (VScode, Atom, etc)_

**Step 03:** _Edit the  Edtech/lms_api/lms_api/settings.py file_
```javascript
DATABASES = {
		 'default': {
			'ENGINE': 'django.db.backends.mysql',
			'NAME': 'ctp',			#Create a database name 'ctp' in your MySql
			'USER': '****',			#Add Username here
			'PASSWORD': '****',		#Add Password for user
			'HOST': 'localhost',
			'PORT': '3306'
		    }
		}
```
_Or Alternatively replace the above block with this_

```javascript
DATABASES = {
		    'default': {
			'ENGINE': 'django.db.backends.sqlite3',
			'NAME': 'ctp',
		    }
		}
```

**Step 04:** _Install dependencies/requirements_
We are using python Virtual Environment you can go for this or chose your own way. 
Go inside the Edtech and run

`$ pip install -r requirements.txt`

**Or**
We have added the python virtual environment file too, You can activate the environment by the command (Run from Edtech)

for Linux   -- `$ source ctp/bin/activate`

for Windows -- `$ workon ctp/bin/activate` or `$ workon ctp/bin/activate.sp1`

**_All Steps after this will be performed inside the virtual environment (ctp)_**

**Step 05:** _Migrate the django models inside the database run the following commands from the direcotry Edtech/lms_api one after another_

`$ python manage.py makemigrations`

`$ python manage.py migrate`

**Step 06:** _Now, let's create Admin user for Backend, go inside the Edtech/lms_api and run_

`$ python manage.py createsuperuser ` _---complete the process_ </br>
**_Note: This usename:password will be used to access the admin module_**

**Step 07:** _After acticating the environment and admin user, go inside the Edtech/lms_api and run_

`$ python manage.py runserver` **_or_** `$ python3 manage.py runserver`

**Step 08:** _Now, Open another tab or window in terminal
go inside to the Edtech/lms_frontend and start the frontend by the command_

`$ npm start`   _---(this project is build on Ubuntu, so this command will work on Linux)_

_if you got any error on Windwos , then install the react-script in the Edtech/lms_frontend_

`$ npm install react-scripts --save`

_followed by run_

`$ npm start`

**Step 09:** _Visit the http:127.0.0.1:8000/admin/  -- [Backend](http:127.0.0.1:8000/admin/) </br>
Login with the Super User (Admin) credentials </br>
This is the Backend_

**Step 10:** _Visit the http://127.0.0.1:3000/  -- [Frontend](http:127.0.0.1:3000/) </br>
This is the Fronend_

**_We are done here with the installation._** :+1:

<h3 align="left">Connect with Us:</h3>
<p align="left">
<a href="https://twitter.com/7absec" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/twitter.svg" alt="7absec" height="30" width="40" /></a>
<a href="https://linkedin.com/in/7absec" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="7absec" height="30" width="40" /></a>
</p>
