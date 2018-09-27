# Shadowsocks Hub
It is a web app for managing shadowsocks users, servers, nodes (a.k.a. exit points), products, accounts, and traffic. It is best suitable for companies, organizations, and groups of friends to manage their internal shadowsocks infrastructures. 

## Installation (Docker)

1. Install Docker.
2. Install Docker Compose.
3. Download Shadowsocks Hub:
    ```
    cd ~
    git clone https://github.com/shadowsocks/shadowsocks-hub.git
    ```
4. Create an environment file `.env`:
    ```
    cd ~/shadowsocks-hub
    touch .env
    ```
5. Add the following configuration to `.env`:
    ```
    CODE_SECRET=changeThisSecret
    MYSQL_PASSWORD=changeThisPassword
    ```
 
    Change the value of `CODE_SECRET` with a long and random string.  
    Change the value of `MYSQL_PASSWORD` with another long and random string.

6. Create a directory for digital certificate:
    ```
    cd ~/shadowsocks-hub
    mkdir ssl
    ```

7. Set up digital certificate

   Shadowsocks Hub uses https for all web traffic. It requires you to set up a digital certificate. You may obtain your digital certificate and key pair from any Certificate Authority (e.g. Let's Encrypt). Then rename the certificate file to `server.cert` and the key file to `server.key`. Finally, copy both `server.cert` and `server.key` to `~/shadowsocks-hub/ssl` directory.

8. Create and start Docker container:
    ```
    cd ~/shadowsocks-hub
    docker-compose up -d
    ```

    The first time will take a while (a few seconds ~ few minutes), in order to download docker images from Docker Hub and run them. So be patient. ;-)

9. Shadowsocks Hub uses [shadowsocks-restful-api](https://github.com/shadowsocks/shadowsocks-restful-api) to manage shadowsocks node. Install it on every server acting as a shadowsocks node.

## Non-Docker Installation (deprecated)
This installation method has been deprecated and will be removed in the future. Please use the above mentioned docker installation method.

1. Install Nodejs 8 or above.
2. Install MySQL.
3. Download and install Shadowsocks Hub:
    ```
    cd ~
    git clone https://github.com/shadowsocks/shadowsocks-hub.git
    cd ~/shadowsocks-hub
    npm i
    sudo npm i -g knex
    sudo npm i -g pm2
    ```
4. Create a MySQL database `sshub`:
    ```
    CREATE DATABASE sshub;
    ```
5. Edit PM2 config file `~/shadowsocks-hub/ecosystem.config.js`, change the following configurations to your local settings :
    ```
    JWT_SECRET: '2wk0M@ow094B^&9k3==~o2soejd$sEEo@2(',
    DATABASE_HOST: 'localhost',
    DATABASE_PORT: '3306',
    DATABASE_USER: 'root',
    DATABASE_PASSWORD: 'd4f889df22769f54',

   Change the value of `JWT_SECRET` with a long and random string.  
   Change the values about the MySQL database connection to your local configurations.

6. Initialize database:
    ```
    cd ~/shadowsocks-hub
    knex migrate:latest --env production
    ```
7. Set up digital certificate

   Shadowsocks Hub uses https for all web traffic. It requires you to set up a digital certificate. You may obtain your digital certificate and key pair from any Certificate Authority (e.g. Let's Encrypt). Then rename the certificate file as `server.cert` and the key file as `server.key`. Finally, copy both `server.cert` and `server.key` to `~/shadowsocks-hub`.

8. Give non-root user permission to use port 80, 443

   Shadowsocks Hub requires listenning to port 80 and 443. The following commands allow a non-root user to use both ports. This is the best practice from security point of view.

   ```
   sudo apt-get install libcap2-bin
   sudo setcap cap_net_bind_service=+ep /usr/bin/node
   ```

9. Shadowsocks Hub uses [shadowsocks-restful-api](https://github.com/shadowsocks/shadowsocks-restful-api) to manage shadowsocks node. Install it on every server acting as a shadowsocks node.

## Update from non-Docker installation to Docker installation
1. Make above mentioned docker version installation.

2. Backup existing database:
    ```
    cd ~/shadowsocks-hub
    mysqldump -u root -p sshub > backup.sql
    ```

3. Restore the backup to docker MySQL container:
    ```
    cd ~/shadowsocks-hub
    docker-compose up -d
    cat backup.sql | docker exec -i shadowsocks-hub_db_1 mysql -u root --password=MYSQL_PASSWORD sshub
    ```

    Note replace `MYSQL_PASSWORD` with your configration in `.env` file.

## Run
1. Run Shadowsocks Hub:
    ```
    cd ~/shadowsocks-hub
    docker-compose up -d
    ```

2. Visiting Shadowsocks Hub:

    Visiting your Shadowsocks Hub website using your server domain name in a web browser.   

3. Change admin credential

   For the sake of security, you should immeidately change the default admin user username and password upon installation. This can be done by `login` as the admin user and then `update` the username and password. The default username and password for the admin user are `admin@email.com` and `pleaseChangePassword`, respectively.

   ![admin_update_profile](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_update.png)

4. Run [shadowsocks-restful-api](https://github.com/shadowsocks/shadowsocks-restful-api) on every server acting as a shadowsocks node.

## Stop
```
cd ~/shadowsocks-hub
docker-compose stop
```

## Restart
```
cd ~/shadowsocks-hub
docker-compose restart
```

## Usage
### Admin
Once logged in as the admin, the menu looks like:

![admin_menu](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_menu.png)

The admin may choose to navigate to:
1. Managing servers. A `server` is a machine acting as a shadowsocks exit point. A `server` may have more than one `node`. Admin has to provide its IP address or domain name when adding a `server`. Admin may add, edit, and delete a `server`. Note that a `server` cannot be deleted if a `node` has been created using this `server`. Admin has to delete all its `nodes` before successfully deleting the `server`.

   The admin may also check and navigate to any `nodes`, `accounts`, or `users` using a `server`, and check total `traffic` that a `server` has served.

   ![admin_server](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_server.png)

2. Managing nodes. A `node` is a virtual shadowsocks exit point. The difference between `server` and `node` is that a `server` is an indpendent machine where a `node` is a logical machine whose functionality relies on `server`. There can be multiple `nodes` residing on a single `server`. From users' perspective, `nodes` using the same `server` are different shadowsocks exit points. Before adding a `node`, the underlying `server` has to be added into the system first. When adding a new `node`, the admin has to select a server, give it a descriptive name, and provide its managing port, and managing password. Admin may also edit and delete a `node`. Note that a `node` cannot be deleted if an `account` has been created using this `node`. Admin has to delete all its `accounts` before successfully deleting the `node`.

   The admin may also check and navigate to the `server` that a `node` belongs to, any `accounts` or `users` using a `node`, and check total `traffic` that a `node` has serverd.

   ![admin_node](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_node.png)

3. Managing products. A `product` is a shadowsocks service subscription. When adding a new `product`, the admin has to give it a descriptive name, select a period of subscription, and provide traffic allowance for the period. The admin may also edit and delete a `product`. Note that a `product` cannot be deleted if a `request` has been created on this `product` (regardless of whether the `request` is aproved or not).

   The admin may also check and navigate to any `accounts`, `users`, or `requests` relating to a `product`.

   ![admin_product](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_product.png)

4. Managing users. A `user` is a person using the shadowsocks service provided. The system is not open for registration, due to its nature of internal use. A new `user` has to be added by the admin into the system. When adding a new `user`, the admin has to provide an email and initial password. The admin may also edit and delete a `user`. Note that a `user` cannot be deleted if a `request` has been created for this this `user` (regardless of whether the `request` is aproved or not).

   The admin may also check and navigate to any `accounts`, `requests`, `products`, `nodes`, or `servers` relating to a `user`.

   ![admin_user](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_user.png)

5. Managing requests. A `request` is made by the admin for a `user` on a `product`, or is made by a `user` on a `product`. Before making a `request`, its underlying `user` and `product` have been added into the system. It requests for a shadowsocks service. The admin may choose to approve a `request`. Upon approval, the system will create one `account` on every `node` that the system has. These `accounts` will allow the `user` to use the specified shadowsocks service. The `account` information will be shown when the `user` login the system.

   The admin may also check and navigate to any `accounts`, `product`, or `user`, and check total `traffic` relating to a `request`. 

   ![admin_request](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_request.png)

6. Managing accounts. An `account` is a shadowsocks account containing all information needed for its `user` to use the shadowsocks service. The admin may manually add a new `account` by selecting a `user` and a `request`. Before adding an `account`, its underlying `user` and `request` have to be added into the system first. The admin may also delete an `account`. Note that an `account` cannot be deleted if `traffic` information of the `account` has been created by the system.

   The admin may also check and navigate to the `server`, `node`, `product`, `user`, `request`, and check total `traffic` relating to an `account`. In addition, the admin may choose to show a QR code encoding the account information. 

   ![admin_account](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/admin_account.png)

### Users
Once logged in as a user, the menu looks like:

![user_menu](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/user_menu.png)

A user may choose to navigate to:
1. Showing their accounts. A `user` check the latest `traffic` of any of their own `accounts`. They may also get the QR code displayed for any of their `accounts`.

   ![user_account](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/user_account.png)

2. Showing all products. A `user` may choose the make a `request` on a `product`. Once a `request` is created, it has to be approved by the admin before `accounts` created by the system.

   ![user_product](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/user_product.png)

3. Showing their requests. A `user` may check and navigate to any `accounts`, and check the `traffic` relating to a `request`.

   ![user_request](https://github.com/shadowsocks/shadowsocks-hub/blob/master/screen_shots/user_request.png)

## Rate limit
You may enforce a rate limit by setting the maximum number of requests allowed within 15-minute window from the same ip address. Requests exceeding the limit will be refused with HTTP status code `429 Too Many Requests`. This setting can be done by add the following config to the `.env` file.
    ```
    RATE_LIMIT = 50
    ```

   Change the number to your choice.

## Bug report, feature request, and feedback

Bug report, feature request, and feedback is welcome. Bugs have a high priority to get addressed. Feature requests and improvement feedback will be considered depending on their popularity and importance.