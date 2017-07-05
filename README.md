
# full stack demo
nodeJs, express, mongoDB, bootstrap, angularJS

## Technology used
1. Server-end: node.js, express, log4js
2. DataBase: mongoDB, ORM: mongoose
3. Front-end: bootstrap, requireJs, jQuery, angularJs v1.2
4. Tools: grunt, bower
5. Async: Q


## directory structure

```bash
.
├── daos                        # data access layer folder
├── dist                        # dist folder
├── logs                         
├── models                      # data model
├── public                       
│   ├── images        
│   ├── js                
│   │   ├── admin			    # Administration folder (angular)
│   │   ├── app					# Client page folder
│   │   ├── common				# common
│   │   ├── admin.js        	# Administration entry
│   │   ├── adminMain.js    	# Administration require config
│   │   ├── app.js    			# Client entry
│   │   └── main.js         	# Client page require config
│   ├── libs
│   ├── styles
│   ├── upload
│   └── views					 # html template
├── routers                      # router folder                       
├── app.js                       # project entry
├── config.js                    # project config
├── Gruntfile.js               	 # grunt config
├── package.json             	 # project description 
└── log.js               		 # log4js config
