* fixing access denied for 'root'@'localhost' on linux ubuntu
  - install mysql service for linux `sudo apt install mysql-server
  - start service => service mysql restart
  - set a password => sudo mysql_secure_installation
  - if something weird happens just alter the password again => 
    * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YOUR_NEW_PASSWORD_MATCHING_CRITERIA';