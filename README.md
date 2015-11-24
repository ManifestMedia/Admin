#Admin Pannel

Manifest admin is a cms without a frotend, in short. The idea behind it is that the db layer is handled and accessed via backend ui. That way it is possible to build fronted without most restrictions of a standard cms, by using the data and database handled by Admin panel. To be clear this is not end user oriented product, in terms that it is built for web developers who are tired of re writing the same functionalities and designing the same ui. This admin ui is built around some general requirements for an average website, like the need for pages, menu, articles or article gallery, file upload etc.
All the specific requirements can be easily added using the codeigniter framework on which the admin is based on. This way the end user can have full custom fronted, powered by a backend admin ui that doesn't have to be heavily moded in order to provide specifics that the end user is requesting.

##Views
Here is a list of all backend views, with basic functions and input fields associated to them.
####Frontend placeholder
####Install
* Creates database with provided user credentials
    * db username
    * db password
* Create cms admin that is used to login to admin ui after installation
    * email
    * password
    * confirm password

####Login
* Logs in user in admin ui
    * email
    * password
* Send password recovery mail to provided email
    * email

####My profile
* Edit personal information of currently logged in user
    * First name
    * Last name
    * Email
    * Secondary email
* Change password of currently logged in user
    * Password
    * new Password
    * Confirm new password

####Dashboard
* Display number of pages, articles and users
* Display latest added articles and pages
* Post a quick article
    * Article title
    * Add to page
    * Article content

####Pages
* Add new page
    * Page title
* List all pages
    * Order pages via drag and drop

####Articles
* Create new or edit article
    * Artice title
    * Article abstract
    * Article content
    * image gallery
    * files table
* Article settings
    * Add to page
    * Add language
    * Add header image

####Settings
* Set website title/header
* Upload website header image or logo

####Users
* Add new user or edit existing user data
* List all users
