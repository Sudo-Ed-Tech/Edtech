<html>
<link rel="stylesheet" href="editormd/css/editormd.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="editormd/editormd.min.js"></script>
<script type="text/javascript">
    $(function() {
        var editor = editormd("test-editor", {
            // width  : "100%",
            // height : "100%",
            path   : "editormd/lib/"
        });
    });
</script>

![](https://github.com/Sudo-Ed-Tech/Edtech/blob/main/lms_frontend/public/logown.png)

<h1>Ed-Tech</h1>

<h3>Features</h3>
**Modules**
1.  eLearning
2. Corporate Training

**eLearning modules**
1. Teacher 
	a] Courses
		Create
		Update
		Delete
	b] Chapters
		Create
		Update
		Delete
	c] Enlolled Student
		View
2. Student
	a] Course
		Enroll
		Rate
		Like
	b] Teacher Details
		View
3. Course
		Chapters
		Enrollement
		Like
		Rate 

**Corporate Training**
1. Course Creator
	a] Training Courses
		Create
		Update
		Delete
		Assign Trainer
2. Trainer
		Training the course
		Trainee Attendance
3. Student/Trainee
		Attend training Meeting
		Or Watch the recording
4. Training Session
		Topic Name
		Time
		Date
		Meeting Link
		Trainer details
5. Training Recording
		Topic Name
		Time
		Date
		Session Note
		Session Recording

<h3>Project Installation and Setup</h3>
**Step 00:** Requirements
1. Git
2. Python
3. NPM

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

**Step 09:** _Visit the http:127.0.0.1:8000/admin/   [Links](http:127.0.0.1:8000/admin/) </br>
Login with the Super User (Admin) credentials </br>
This is the Backend_

**Step 10:** _Visit the http://127.0.0.1:3000/  [Links](http:127.0.0.1:3000/) </br>
This is the Fronend_

</html>

**_We are done here with the installation._**
