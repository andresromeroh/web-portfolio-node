# web-portfolio-backend
The services for my web portfolio. Written with NodeJS/Typescript.

## About this Project
This is a NodeJS Backend ready application that you can use to serve your web portfolio UI, it's configurable and provides different features:

* **GitHub Integration:** Pull GitHub projects or do a custom search by using the `/repositories` controller.

* **Data Caching:** This application implements data caching by using Redis an in-memory data structure store.

* **Acclaim Data Acces:** Access to all of your Acclaim badges data and certifications by using Web Scrapping.

* **E-mail Sending:** Send custom emails using templates by connecting the application to the [SendGrid](https://sendgrid.com/) API.

## Docker Deployment
The project can be deployed using Docker, I did so by using a Raspberry PI with [Ubuntu](https://ubuntu.com/download/raspberry-pi) then installing and deploying to docker is as easy as:
```shell
curl -sSL https://get.docker.com | sh && ./deploy.sh
```

## Heroku Deployment
If you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, you can use it to deploy as well by running these commands in the root folder:
```shell
heroku create
git push heroku master
```

## ENV Variables
```shell
GITHUB_API_URL=https://api.github.com/users/USERNAME
SENDGRID_RECEIVER_ADDRESS=receiver@gmail.com
SENDGRID_SENDER_ADDRESS=sender@gmail.com
ACCLAIM_BADGE_URL=https://www.youracclaim.com/badges
CORS_WITHELIST=https://domain-1.com,https:/domain-2.com
```

Tokens, URLs and APIs can be found following the respective [GitHub](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token), [Sendgrid](https://sendgrid.com/docs/ui/account-and-settings/api-keys/) and [Acclaim](https://support.youracclaim.com/hc/en-us/articles/360039852511-How-do-I-share-my-Acclaim-Profile-) guides.