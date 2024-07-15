<template>
    <div class="">
        <Header />
        <div class="create-product-body">
            <div class="sidebar">
                <SidebarMenu />
            </div>
            <div class="product-container">
                <div class="new_post">
                    <div class="add_post">
                        <div class="add_post_h">
                            <img src="../assets/file_orange.svg" alt="">
                            Добавить пост
                        </div>
                        <FailModerationWarning style="display: none;"/>
                        <div class="add_post_i">
                            <div class="title">Напишите пост</div>
                            <div class="post_btns">
                                <div class="post_btn">
                                    <img src="../assets/photo_i.svg" alt="">
                                    Фото
                                </div>
                                <div class="post_btn">
                                    <img src="../assets/video_i.svg" alt="">
                                    Видео
                                </div>
                                <div class="post_btn">
                                    <img src="../assets/music_i.svg" alt="">
                                    Аудио
                                </div>
                                <div class="post_btn">
                                    <img src="../assets/file_i.svg" alt="">
                                    Файл
                                </div>
                            </div>
                            <div class="inputs">
                                <input type="text" name="" id="" placeholder="Введите заголовок поста">
                                <textarea style="display: none;" placeholder="Введите описание поста "></textarea>
                                <div class="np_item">
                                    <PostContent />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="np_settings">
                        <div class="np_settings_i">
                            <div class="title">Кто может смотреть</div>
                            <div class="sup">Пожалуйста, выберите 1 из пунктов</div>
                            <div class="or_inps">
                                <div class="or_inp">
                                    <div class="gal_inp active"></div>
                                    Открыт для всех!
                                </div>
                                <div class="or_inp">
                                    <div class="gal_inp "></div>
                                    Только подписчики
                                </div>
                                <div class="or_inp">
                                    <div class="gal_inp "></div>
                                    Подписчики или разовая оплата
                                </div>
                                <div class="or_inp">
                                    <div class="gal_inp "></div>
                                    Только разовая оплата
                                </div>
                                <div class="or_sel" style="display: none;">
                                    <label for="">Уровень</label>
                                    <select>
                                        <option value=""></option>
                                        <option value="">
                                            Секрет получения 500 руб. уже завтра: 299р. и выше
                                        </option>
                                        <option value="">
                                            Секрет получения 990руб. уже завтра: 500р. и выше
                                        </option>
                                        <option value="">
                                            Новый магнит клуб “Богатей с Алексом Жарким” + Х БОНУС!: 5000р. и выше
                                        </option>
                                        <option value="">
                                            Секрет получения 1990руб. уже завтра:990р. и выше
                                        </option>
                                        <option value="">
                                            5000руб. в день на автомате: 1990р. и выше
                                        </option>
                                    </select>
                                </div>
                                <div class="or_inp_t" style="display: none;">
                                    <label for="">Стоимость поста в рублях</label>
                                    <input type="number">
                                </div>
                                <div class="or_inp" style="font-size: 15px;">
                                    <div class="gal_inp " style="border-radius: 3px;"></div>
                                    Отключить комментарии под постом
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="btn_add_p">Изменить пост</div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header";
import PostContent from "@/components/PostContent";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import Footer from "@/components/Footer";
import ModalVideo from "@/components/ModalVideo";
import Wait from "@/components/ModerationModals/Wait";
import Succes from "@/components/ModerationModals/Success";
import Fail from "@/components/ModerationModals/Fail";
import FailModerationWarning from "@/components/FailModerationWarning";


export default {
    name: 'NewPost',
    components: {
        Header,
        SidebarMenu,
        Footer,
        PostContent,
        ModalVideo,
        Wait,
        Succes,
        Fail,
        FailModerationWarning
    }
}
</script>

<style scoped lang="scss">
.create-product-body {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 2fr 2fr 18fr;
    background-color: var(--secondary-color);
}

.sidebar {
    width: 225px;
}

.product-container {
    width: 83%;
    padding-top: 6rem;
    font-family: 'Inter', serif;
    color: black !important;

    .new_post {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .add_post {
        width: 70%;

        .add_post_h {
            width: 98%;
            height: 45px;
            background-color: white;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .add_post_i {
            width: 100%;
            height: auto;
            background: #FFFFFF;
            border-radius: 15px;
            padding-bottom: 1rem;

            .title {
                text-align: center;
                font-size: 26px;
                font-weight: 600;
                padding-top: 2rem;
            }
        }

        .post_btns {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 70%;
            margin-right: auto;
            margin-left: auto;
            margin-top: 2rem;

            .post_btn {
                width: 137px;
                height: 44px;
                background: #FE6637;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
                font-size: 20px;
                color: white;
                font-weight: 600;
                cursor: pointer;
            }
        }

        .inputs {
            width: 95%;
            margin-right: auto;
            margin-left: auto;
            margin-top: 2rem;

            input {
                width: 98%;
                height: 43px;
                border: 1px solid #A8ADB8;
                border-radius: 10px;
                padding-left: 1rem;
                outline: 0;
            }

            textarea {
                width: 98%;
                padding-top: 1rem;
                padding-left: 1rem;
                margin-top: 1rem;
                height: 105px;
                border: 1px solid #A8ADB8;
                border-radius: 10px;
                font-family: inherit;
                resize: vertical;
                outline: 0;
            }

            textarea::placeholder {
                // padding-top: 5px;
                font-family: inherit;
            }
        }
    }

    .np_settings {
        text-align: left;
        width: 350px;
        min-height: 300px;
        max-height: 455px;
        background: #FFFFFF;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 15px 20px;

        label {
            margin-bottom: 5px;
        }

        .np_settings_i {

            .title {
                font-size: 20px;
                font-weight: 500;
                color: black;
                text-align: left;
            }

            .sup {
                text-align: left;
                font-weight: 400;
                font-size: 16px;
                line-height: 19px;
                color: #7A7777;
                margin-top: 10px;
            }
        }

        .or_inps {
            margin-top: 1rem;

            .gal_inp {
                height: 20px;
                width: 20px;
                border: 1px solid #FE6637;
                border-radius: 20px;
            }

            .gal_inp.active {
                background-color: #FE6637;
            }

            .gal_inp.active::after {
                content: url(../assets/galochka_orange.svg);
                position: relative;
                bottom: 3px;
            }

            .or_inp {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 16px;
                margin-bottom: 1rem;
            }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            /* display: none; <- Crashes Chrome on hover */
            -webkit-appearance: none;
            margin: 0;
            /* <-- Apparently some margin are still there even though it's hidden */
        }

        input {
            width: 310px;
            height: 39px;
            border: 1px solid #A8ADB8;
            border-radius: 10px;
            margin-bottom: 1rem;
            margin-top: 5px;
            box-sizing: border-box;
            padding-left: 1rem;
            outline: 0;
        }

        .or_sel {
            margin-bottom: 1rem;
            text-align: left;

            select {
                width: 310px;
                height: 39px;
                border: 1px solid #A8ADB8;
                border-radius: 10px;
                box-sizing: border-box;
                padding: 0 5px;
                outline: 0;
                margin-top: 5px;
            }

        }

    }
}

.btn_add_p {
    width: 300px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: uppercase;
    background: #FE6637;
    border-radius: 10px;
  margin: 2rem auto 1rem;
  cursor: pointer;
}

.np_item {
    padding: 10px 20px;
    border: 1px solid #A8ADB8;
    border-radius: 20px;
    margin-top: 1rem;
}
@media screen and (max-width: 1440px) {
  .product-container {
    width: 100%;
  }
  .product-container .new_post {
    justify-content: space-evenly;
  }
  .product-container .add_post {
    width: 60%;
  }
  .product-container .np_settings {
    width: 35%;
  }
  .product-container .add_post .post_btns {
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 769px) {
  .sidebar {
    width: 10px;
  }
  .product-container .add_post .post_btns {
    flex-direction: column;
  }
  .product-container .add_post .post_btns .post_btn {
    width: 50%;
    margin-top: 10px;
  }
  .create-product-body {
    grid-template-columns: 1fr 2fr 20fr;
  }
  .product-container .new_post {
    width: 90%;
    flex-direction: column;
  }
  .product-container .add_post {
    width: 100%;
  }
  .product-container .np_settings {
    width: 100%;
    margin-top: 20px;
  }
  .btn_add_p {
    width: 80%;
    margin: 30px 0 30px 25px;
  }
}
</style>