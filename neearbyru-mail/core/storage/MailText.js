class MailTextUser{
    constructor() { }

    // async registrationMailText(user){
    //     return {
    //         from: 'Neearby <info@neearby.pro>',
    //         to: user.email,
    //         subject: `Ваши данные для входа в сервис Neearby.com`,
    //         html:
    //             '<p><span style="font-family:Tahoma,Geneva,sans-serif;"><span style="font-size:16px;">Спасибо, что выбрали наш сервис <strong><a href="https://neearby.com"><span style="color:#3498db;">Neearby.Com</span></a></strong><br />\n' +
    //             '<br />\n' +
    //             '<strong>Ваши данные для входа:</strong><br />\n' +
    //             'Email:' +
    //             user.email +
    //             '<br />\n' +
    //             'Пароль:' +
    //             user.password +
    //             '</span></span></p>',
    //     };
    // }

    async mailRecoverPassword({ email, name, password}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: email,
            subject: `Восстановление пароля в сервисe Neearby.com`,
            html:
                '<p><span style="font-family:Tahoma,Geneva,sans-serif;">' +
                `<span style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;"> ${name} здравствуйте <strong><br/>` +
                '<span style="font-weight: 100;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">На связи команда Neearby!</span></strong><br/> \n' +
                '<p style="font-weight: 600;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-bottom: 0">Ваши данные при входе в Neearby</p>\n' +
                '<p style="margin-bottom: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-top: 0">Ссылка: http://neearby.ru</p>\n' +
                `<p style="margin-bottom: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-top: 0">Логин: ${email} </p>` +
                `<p style="margin-bottom: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-top: 0">Пароль: ${password} </p>\n` +
                '<p style="margin-bottom: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;">Есть вопросы? Обращайтесь - поможем!</p>'+
                '<p style="margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;"><a href="mailto:support@neearby.com">support@neearby.com</a></p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">P.S. Обязательно сохраните это письмо!</p>' +
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-top: 0">С уважением, команда Neearby </p>\n'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-top: 0"> Neearby — всегда рядом!</p>'
        };
    }

    async mailRegistrationAndConfirmation({ name ,link , email, password}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: email,
            subject: `${name}, Подтвердите свой email и получите 500 рублей..`,
            html:
                '<p><span style="font-family:Tahoma,Geneva,sans-serif;">' +
                `<span style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;"> ${name} здравствуйте <strong><br/>` +
                '<span style="font-weight: 100;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">На связи команда Neearby!</span></strong><br/> \n' +
                `<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;"><a href="${link}">Кликните по этой ссылке сейчас для подтверждения своего email’a >>> </a></p>\n`+
                // '<p style="margin-top: 0;margin-bottom: 0">После подтверждения своего e-mail</p>' +
                '<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Вы получите бонусный видео-урок от Neearby</p>\n' +
                '<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">«Как Вам получить бонус в течении 1 часа»</p>' +
                '<p style="font-weight: 600;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Ваши данные при входе в Neearby</p>\n' +
                `<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Логин: ${email} </p>` +
                `<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Пароль: ${password} </p>\n` +
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Есть вопросы? Обращайтесь - поможем!</p>'+
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;"><a href="mailto:support@neearby.com">support@neearby.com</a></p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">P.S. Обязательно сохраните это письмо!</p>' +
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">С уважением, команда Neearby </p>\n'+
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;"> Neearby — всегда рядом!</p>'
        };
    }


    async mailAfterConfirmedRegistration({ name , email, password }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: email,
            subject: `${name}, Спасибо за регистрацию. Получите 500 рублей.`,
            html:
                '<p><span style="font-family:Tahoma,Geneva,sans-serif;">' +
                `<span style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;"> ${name} здравствуйте <strong><br/>` +
                '<span style="font-weight: 100;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">На связи команда Neearby!</span></strong><br/> \n' +
                `<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">
                    <a href="http://neearby.ru/thank-you-for-registering">
                        Кликните по этой ссылке сейчас и смотрите видео-урок >>>
                    </a>
                </p>\n`+
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Вы получите бонусный видео-урок от Neearby:</p>\n' +
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">«Как Вам получить 500 рублей в течении 1 часа»</p>' +
                '<p style="font-weight: 600;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Ваши данные при входе в Neearby</p>\n' +
                `<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Логин: ${email} </p>` +
                `<p style="margin-top: 0;margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Пароль: ${password} </p>\n` +
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Есть вопросы? Обращайтесь - поможем!</p>'+
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;"><a href="mailto:support@neearby.com">support@neearby.com</a></p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">P.S. Обязательно сохраните это письмо!</p>' +
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">С уважением, команда Neearby </p>\n'+
                '<p style="margin-bottom: 0;margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;"> Neearby — всегда рядом!</p>'
        };
    }


    async productOrderPayedMail({ buyer, author, product, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ «' +
                product.title +
                '» в магазине «' +
                author.login +
                '» создан!\n',
            html:
                buyer.name +
                ', здравствуйте!<br><br>' +
                'Ваш заказ «' +
                product.title +
                '» в магазине «' +
                author.login +
                '» создан! ' +
                '\n' +
                '<br>' +
                '\n' +
                'Название сформированного товара ' +
                product.title +
                '<br>' +
                '\n' +
                'Цена товара ' +
                order.price +
                ' руб' +
                '\n' +
                '\n' +
                '<br>' +
                "Ссылка на форму оплаты:   <a href='" +
                order.payment_link +
                "'>Ссылка</a>" +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buyProductMail({ buyer, author, product }) {
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ «' +
                product.title +
                '» в магазине «' +
                buyer.login +
                '» оплачен!\n',
            html:
                buyer.name +
                ', здравствуйте!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'Ваш заказ «' +
                product.title +
                '» в магазине «' +
                author.login +
                '» оплачен!\n' +
                '\n' +
                '<br>' +
                "Ссылка на товар:   <a href='" +
                product.download_link +
                "'>Ссылка</a>  \n" +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.\n' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async subscriptionOrderPayedMail({ buyer, author, subscription, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ на подписку«' +
                subscription.title +
                '» в магазине «' +
                author.login +
                '» создан!\n',
            html:
                buyer.name +
                ', здравствуйте!<br><br>' +
                'Ваш заказ на подписку «' +
                subscription.title +
                '» в магазине «' +
                author.login +
                '» создан! <br><br> ' +
                '\n' +
                '<br>' +
                '\n' +
                'Название сформированной подписки ' +
                subscription.title +
                '<br>' +
                '\n' +
                'Цена товара ' +
                order.price +
                ' руб <br><br>' +
                '\n' +
                '\n' +
                '<br>' +
                "Ссылка на форму оплаты:   <a href='" +
                order.payment_link +
                "'>Ссылка</a> <br><br>" +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buySubscriptionMail({ buyer, author, subscription }) {
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ подписки «' +
                subscription.title +
                '» в магазине «' +
                buyer.login +
                '» оплачен!\n',
            html:
                buyer.name +
                ', здравствуйте!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'Ваш заказ подписки «' +
                subscription.title +
                '» в магазине «' +
                author.login +
                '» оплачен!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.\n' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buyPostMail({ buyer, author, post }) {
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ на покупку поста «' +
                post.title +
                '» в магазине «' +
                author.login +
                '» оплачен!\n',
            html:
                buyer.name +
                ', здравствуйте!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'Ваш заказ подписки «' +
                post.title +
                '» в магазине «' +
                author.login +
                '» оплачен!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.\n' +
                '<br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async postOrderPayedMail({ buyer, author, post, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ на покупку поста «' +
                post.title +
                '» в магазине «' +
                author.login +
                '» создан!\n',
            html:
                buyer.name +
                ', здравствуйте!<br><br>' +
                'Ваш заказ на пост «' +
                post.title +
                '» в магазине «' +
                author.login +
                '» создан! <br><br> ' +
                '\n' +
                '<br>' +
                'Название сформированного поста ' +
                post.title +
                '<br>' +
                'Цена товара ' +
                order.price +
                ' руб <br><br>' +
                '<br>' +
                "Ссылка на форму оплаты:   <a href='" +
                order.payment_link +
                "'>Ссылка</a> <br><br>" +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async adsOrderPayedMail({ buyer, author, ads, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ для размещения обьявления создан',
            html:
                buyer.name +
                ', здравствуйте!<br><br>' +
                'Ваш заказ размещения обьявления в магазине «' +
                author.login +
                '» создан!' +
                '\n' +
                '<br>' +
                'Цена размещения ' +
                order.price +
                ' руб' +
                '<br>' +
                "Ссылка на форму оплаты:   <a href='" +
                order.payment_link +
                "'>Ссылка</a>" +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buyAdsMail({ buyer, author, ads, order }) {
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Ваш заказ на размещения обьявления в магазине «' +
                author.login +
                '» оплачен!\n',
            html:
                buyer.name +
                ', здравствуйте!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'Ваш заказ на размещение обьявления в магазине «' +
                author.login +
                '» оплачен! Ожидайте размещения от автора магазина\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.\n' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async subscriptionRenewalMail({ buyer }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: buyer.email,
            subject:
                'Было произведенно автоматическое списание за  подписку <Neearby.com>',
            html:
                buyer.name +
                ', здравствуйте!\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'Было произведенно автоматическое списание за подписку на сервисе neearby.com' +
                '\n' +
                '<br>' +
                '<br>' +
                'Для отмены подписки перейдите на сайт сервиса, и в разделе Мои подписки отмените подписку \n' +
                "Ссылка:   <a href='https://neearby.com'>Neearby.com</a>  \n" +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.\n' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async deleteAdsText(data){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: data.creator.email,
            subject:
                'Ваше объявление было удаленно <Neearby.com>',
            html:
                data.creator.name +
                ', здравствуйте!\n <br>' +
                '\n' +
                '<br>' +
                `Выше объявление было удаленно на странице автора ${data.author.login} в сервисе neearby.com <br>` +
                '\n' +
                '\n' +
                '<br>' +
                `Причина удаления ${data.ads.delete_reason} <br>` +
                '\n' +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby <br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async textMailing(data){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: data.user.email,
            subject:
                data.title + ' <Neearby.com>',
            html:
                data.author.name + ' ' + data.message+
                '<br>' +
                '<br>' +
                'С уважением, Neearby <br>'
        };
    }

    async deleteProduct({author, target, message}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Ваш товар был удален администратором <Neearby.com>',
            html:
                author.name +
                ', здравствуйте!\n <br>' +
                '\n' +
                '<br>' +
                `Выш товар ${target.title} был удален по причине ${message} в сервисе neearby.com <br>` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby <br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async deleteSubscription({author, target, message}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Ваша подписка была удалена администратором <Neearby.com>',
            html:
                author.name +
                ', здравствуйте!\n <br>' +
                '\n' +
                '<br>' +
                `Выша подписка ${target.title} была удалена по причине ${message} в сервисе neearby.com <br>` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby <br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async deletePost({author, target, message}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Ваш пост был удален администратором <Neearby.com>',
            html:
                author.name +
                ', здравствуйте!\n <br>' +
                '\n' +
                '<br>' +
                `Выш пост ${target.title} был удален по причине ${message} в сервисе neearby.com <br>` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby <br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

}

class MailTextAuthor {

    constructor() { }


    async mailAfterBecomeAuthor({ name , email }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: email,
            subject: `${name}, поздравляем! Теперь Вы сможете продавать товары и подписки.`,
            html:
                '<p style="margin-bottom: 0;"><span style="font-family:Tahoma,Geneva,sans-serif;">' +
                `<span style="font-size:16px;margin-top: 0;font-family:Tahoma,Geneva,sans-serif;margin-bottom: 0"> ${name} здравствуйте` +
                '<p style="margin-top: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-bottom: 0"><span>На связи команда Neearby!</span></p>' +
                `<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Поздравляем Вас! Вы выполнили уже 50% шагов.</p>`+
                '<p style="margin-top: 0;font-family:Tahoma,Geneva,sans-serif;font-size:16px;margin-bottom: 0">Осталось ещё 50%, чтобы начать зарабатывать.</p>' +
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Шаг 1. Вам нужно создать свои товары для разовой оплаты от Ваших клиентов.</p>' +
                '<p style="margin-top: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-bottom: 0">Не знаете какой товар создать? Воспользуйтесь готовым \n каталогом популярных товаров с правами-перепродажи и \n начните зарабатывать на них. \n</p>' +
                '<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Шаг 2. Ежемесячные платежи или ежемесячный доход на автомате. \n' +
                'Не знаете какую подписку создать? Воспользуйтесь готовым \n' +
                'каталогом популярных подписок с правами-перепродажи и \n' +
                'начните зарабатывать на них. \n</p>'+
                '<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Эти 2 необходимых шага, которые Вам необходимо сделать \n' +
                'для того, чтобы Вы смогли получать деньги.</p>'+
                '<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Как только сделайте этот шаг - загрузите свою \n фотографию, обложку, укажите в разделе \n вывод средств свою карту для получения \n денежных средств после продаж. \n\n</p>'+
                '<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Не знаете как рекламировать? Возникают какие-то \n другие сложности? \n\n</p>'+
                '<p style="font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Приведите в наш официальный Telegram-бот \n https://t.me/neearbycom1_bot друзей, получите \n' +
                'на свой баланс бонус и конечно же \n' +
                'полную инструкцию заработка на Neeaby 2.0!</p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">Есть вопросы? Обращайтесь - поможем!</p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-top: 0"><a href="mailto:support@neearby.com">support@neearby.com</a></p>'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;">P.S. Обязательно сохраните это письмо!</p>' +
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-top: 0">С уважением, команда Neearby </p>\n'+
                '<p style="margin-bottom: 0;font-size:16px;font-family:Tahoma,Geneva,sans-serif;margin-top: 0"> Neearby — всегда рядом!</p>'
        };
    }

    async productOrderPayedMail({ buyer, author, product, order }){
       return {
           from: 'Neearby <info@neearby.pro>',
           to: author.email,
           subject: `В вашем магазине создан заказ! Сумма заказа - ${
               order.price
           } руб.`,
           html:
               author.name +
               ', здравствуйте!<br><br>' +
               'Заказ «' +
               product.title +
               '» в магазине «' +
               author.login +
               `» создан пользователем <br><strong>${
                   buyer.name
               }</strong> - ${buyer.email}. <br> Номер телефона - ${
                   buyer.phone
               } <br> На сумму <strong>${
                   order.price
               } руб.</strong> <br> Ссылка на оплату - ${order.payment_link}` +
               '\n' +
               '<br>' +
               '<br>' +
               'С уважением, Neearby.<br>' +
               '\n' +
               'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
       };
    }

    async buyProductMail({ buyer, author, product, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Заказ «' +
                product.title +
                '» в вашем магазине «' +
                author.login +
                `» оплачен!`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                'Заказ «' +
                product.title +
                `» на сумму ${order.price} руб. в магазине «` +
                author.login +
                `» оплачен клиентом - ${buyer.name} - ${buyer.phone}!` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async subscriptionOrderPayedMail({ buyer, author, subscription, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject: `В вашем магазине создан заказ! Сумма заказа - ${
                order.price
            } руб.`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                'Заказ «' +
                subscription.title +
                '» в магазине «' +
                author.login +
                `» создан пользователем <br><strong>${
                    buyer.name
                }</strong> - ${buyer.email}. <br> Номер телефона - ${
                    buyer.phone
                } <br> На сумму <strong>${
                    order.price
                } руб.</strong> <br> Ссылка на оплату - ${order.payment_link}<br><br>` +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buySubscriptionMail({ buyer, author, subscription, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Заказ подписки «' +
                subscription.title +
                '» в вашем магазине «' +
                author.login +
                `» оплачен!`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                'Заказ подписки «' +
                subscription.title +
                `» на сумму ${order.price} руб. в магазине «` +
                author.login +
                `» оплачен клиентом - ${buyer.name} - ${buyer.phone}!` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buyPostMail({ buyer, author, post, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Заказ на покупку поста «' +
                post.title +
                '» в вашем магазине «' +
                author.login +
                `» оплачен!`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                'Заказ на покупку поста «' +
                post.title +
                `» на сумму ${order.price} руб. в магазине «` +
                author.login +
                `» оплачен клиентом - ${buyer.name} - ${buyer.phone}!` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async postOrderPayedMail({ buyer, author, post, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject: `В вашем магазине создан заказ на покупку поста ${post.title}! Сумма заказа - ${
                order.price
            } руб.`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                'Заказ «' +
                post.title +
                '» в магазине «' +
                author.login +
                `» создан пользователем <br><strong>${
                    buyer.name
                }</strong> - ${buyer.email}. <br> Номер телефона - ${
                    buyer.phone
                } <br> На сумму <strong>${
                    order.price
                } руб.</strong> <br> Ссылка на оплату - ${order.payment_link}<br><br>` +
                '\n' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async adsOrderPayedMail({ buyer, author, post, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject: `В вашем магазине создан заказ на размещения обьявления! Сумма заказа - ${
                order.price
            } руб.`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                'Заказ на размещения обьявления создан и ждет оплаты' +
                'Обьявления будет размещено в магазине «' +
                author.login +
                `» пользователем <br><strong>${
                    buyer.name
                }</strong> - ${buyer.email}. <br> Номер телефона - ${
                    buyer.phone
                } <br> После оплаты на ваш счет поступит <strong>${
                    order.price
                } руб.</strong>` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                '\n' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async buyAdsMail({ buyer, author, ads, order }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Заказ на размещение обьявления в вашем магазине «' +
                author.login +
                `» оплачен!`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                `Заказ на размещение обьявления оплачен клиентом - ${buyer.name} - ${buyer.phone}! на сумму ${order.price} руб` +
                '<br>' +
                '<br>' +
                'Вы можете разрешить вывод обьявления или запретить в личном кабинете' +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async subscriptionRenewalMail({ buyer, author, product }){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                'Заказ «' +
                product.title +
                '» в вашем магазине «' +
                author.login +
                `» оплачен!`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                'Подписка «' +
                product.title +
                `» в магазине «` +
                author.login +
                `» оплачен клиентом - ${buyer.name} - ${buyer.phone}!` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        };
    }

    async unsubscribeUser({author, user, subscription}){
        return {
            from: 'Neearby <info@neearby.pro>',
            to: author.email,
            subject:
                `Пользователь ${user.name} отписался от вашей подписки ${subscription.title}`,
            html:
                author.name +
                ', здравствуйте!<br><br>' +
                '\n' +
                `Пользователь ${user.name} отписался от вашей подписки ${subscription.title}` +
                '<br>' +
                '<br>' +
                'С уважением, Neearby.<br><br>' +
                'По вопросам оплаты и техническим вопросам, можно обращаться на почту support@neearby.com',
        }
    }
}

module.exports = { MailTextUser, MailTextAuthor };