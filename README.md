# Shadowsocks Hub
It is a web app for managing shadowsocks users, servers, nodes (a.k.a. exit points), products, accounts, and traffic. It is best suitable for companies, organizations, and groups of friends to manage their internal shadowsocks infrastructures. 

## Install (Ubuntu 16.04)

1. Install Nodejs 8 or above.
2. Install MySQL.
3. Download and install Shadowsocks Hub:
    ```
    cd ~
    git clone https://github.com/shadowsocks/shadowsocks-hub.git
    cd ~/shadowsocks-hub
    npm i
    ```
4. Create a MySQL database `sshub`:
    ```
    CREATE DATABASE sshub;
    ```
5. Create an environment file `.env`:
    ```
    cd ~/shadowsocks-hub
    touch .env
    ```
6. Add the following configuration key-value pairs to `.env`:
    ```
    JWT_SECRET = 2wk0M@ow094B^&9k3==~o2soejd$sEEo@2(

    DATABASE_HOST = localhost
    DATABASE_PORT = 3306
    DATABASE_USER = root
    DATABASE_PASSWORD = d4f889df22769f54
    ```

   Change the value of `JWT_SECRET` with a long and random string.  
   Change the values about the MySQL database connection to your local configurations.

7. Initialize database:
    ```
    cd ~/shadowsocks-hub
    knex migrate:latest --env production
    ```
8. Set up digital certificate

   Shadowsocks Hub uses https for all web traffic. It requires you to set up a digital certificate. You may obtain your digital certificate and key pair from any Certificate Authority (e.g. Let's Encrypt). Then rename the certificate file as `server.cert` and the key file as `server.key`. Finally, copy both `server.cert` and `server.key` to `~/shadowsocks-hub`.   

9. Shadowsocks Hub uses [shadowsocks-restful-api](https://github.com/shadowsocks/shadowsocks-restful-api) to manage shadowsocks node. Install it on every server acting as a shadowsocks node.

## Update
When you have updated Shadowsocks Hub, run the following commands to update database tables:
```
cd ~/shadowsocks-hub-api
knex migrate:latest --env production
```

## Run
1. Run Shadowsocks Hub:
    ```
    cd ~/shadowsocks-hub-api
    sudo node api.js
    ```
    Note that root privilege is required in order to listen on port 80 and 443.

2. Visiting Shadowsocks Hub:

    Visiting your Shadowsocks Hub website using your Shadowsocks Hub server domain name (recorded in the digital certificated) in any web browsers.   

3. Change admin credential

   For the sake of security, you should immeidately change the default admin user username and password upon installation. This can be done by `login` as the admin user and then `update` the username and password. The default username and password for the admin user are `admin@email.com` and `pleaseChangePassword`, respectively.

4. Run [shadowsocks-restful-api](https://github.com/shadowsocks/shadowsocks-restful-api) on every server acting as a shadowsocks node.

5. Have fun!

    Admininistration and user operations should be intuitive, or feel free to leave feedback otherwise.

## Rate limit
You may enforce a rate limit by setting the maximum number of requests allowed within 15-minute window from the same ip address. Requests exceeding the limit will be refused with HTTP status code `429 Too Many Requests`. This setting can be done by add the following config to the `.env` file.
    ```
    RATE_LIMIT = 50
    ```

   Change the number to your choice.

## Bug report, feature request, and feedback

Bug report, feature request, and feedback is welcome. Bugs have a high priority to get addressed. Feature requests and improvement feedback will be considered depending on their popularity and importance.