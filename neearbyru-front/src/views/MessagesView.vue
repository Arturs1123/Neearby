<template>
  <div style="min-height: 100vh">
    <Header/>
    <div class="messages-body">
      <div class="sidebar">
        <SidebarMenu/>
      </div>
      <div class="full-width">
        <div class="left-block">
          <div class="search">
            <div class="search-icon">
              <img src="../assets/search-icon.svg" alt="">
            </div>
            <search-message-input placeholder="Поиск по сообщениям и людям.." height="15" style="width: 70%;"/>
<!--            <text-input placeholder="Поиск по сообщениям и людям.." height="15" style="width: 70%;"/>-->

            <div class="three-dots dropdown" style="justify-self: end; display: inline">
              <DropDown :list="messageType" v-if="showFirstDropdown" changeFont="true" left="-161" top="39"
                        width="176px"
                        style="box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);"/>
              <img src="../assets/three-dots.svg" alt="" @click="this.showFirstDropdown = !this.showFirstDropdown">
            </div>
          </div>

          <div class="chats">
            <div class="chat-item" v-for="chat of chats" @click="currentChat = chat"
                 :class="{selected: currentChat.id === chat.id}">
              <div class="item-wrapper">
                <div class="profile-picture">
                  <img :src="chat.icon" alt="">
                </div>
                <div class="body">
                  <h3 class="check__mark" style="font-size: 16px;">{{ chat?.name }}</h3>
                  <p v-html="chat?.last_message?.message"></p>
                </div>
                <div class="status">
                  <p style="color: rgba(0, 0, 0, 0.6);">{{ new Date(chat.created_at).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}) }}</p>
                  <img style="width: 10px; margin-top: 5px;" src="../assets/unread.svg" alt=""
                       v-if="getUnreadChats().includes(chat.id)">
                </div>
              </div>
              <div class="bottom-divider"></div>
            </div>
          </div>


        </div>
        <div class="right-block" v-if="Object.keys(currentChat).length">
          <div class="chat-room">
            <div class="chat-name">
              <div class="flex">
                <img class="chat-name-img" :src="currentChat.icon" alt="">
                <h3 class="name__check">{{ currentChat.name }}</h3>
                <p style="color: rgba(0, 0, 0, 0.6); margin-left: 15px;">Online</p>
              </div>

              <div class="dropdown">
                <DropDown :list="actionInChat" v-if="showSecondDropdown" changeFont="true" left="-242" top="39"
                          width="260px"
                          style="box-shadow: 0 0 25px 3px rgba(0, 0, 0, 0.15);"/>
                <img src="../assets/three-dots.svg" alt="" @click="this.showSecondDropdown = !this.showSecondDropdown">
              </div>

            </div>
            <hr style="width: 100%; border-color: rgb(255 255 255 / 60%);">
            <div class="chat-content">
              <div class="messages" ref="messages">
                <div class="message" v-for="message of currentChat.messages" :class="{ unread: message.status < 2}"
                     v-observe-visibility="visibilityChanged"
                     :data-id="message.id" :data-status="message.status">

                  <div class="message-data">
                    <div class="logo" style="padding-left: 5px;"><img :src="message.user.picture_path" alt=""></div>
                    <div class="user-name">
                      <p class="user__checked" style="text-align: left;">{{ message.user.name }}</p>
                      <p style="font-size: 12px; color: rgba(0, 0, 0, 0.6); text-align: left">{{ new Date(message.created_at).toLocaleString([], {hour: "2-digit", minute: "2-digit"}) }}</p>
                    </div>
                  </div>

                  <div class="message-content" v-html="message.text">
                  </div>
                </div>
              </div>
              <div class="message-input" v-if="Object.keys(currentChat).length">
                <img src="../assets/attach.svg" alt="">
<!--                <TextInput v-on:keyup.enter="sendMessage" style="margin-left: 10px;" v-model="messageInput"-->
<!--                           placeholder="Напишите сообщение..."/>-->
                <message-view-input v-on:keyup.enter="sendMessage" style="margin-left: 10px;" v-model="messageInput"
                                    placeholder="Напишите сообщение..."/>
                <img style="margin-right: 15px; height: 30px; cursor: pointer" src="../assets/send-arrow.svg" alt=""
                     @click="sendMessage">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SidebarMenu from "@/components/Sidebar/SidebarMenu";
import TextInput from "@/components/TextInput.vue";
import DropDown from "@/components/DropDown.vue";
import searchMessageInput from "@/components/messageInput"
import messageViewInput from "@/components/messageViewInput"
import ApiWrapper from "../api/";
import {mapGetters} from "vuex";
import Vue, {nextTick} from "vue";

export default {
  name: "Messages",
  components: {
    TextInput,
    Header,
    SidebarMenu,
    DropDown,
    searchMessageInput,
    messageViewInput,
  },
  data: function () {
    return {
      showFirstDropdown: false,
      showSecondDropdown: false,
      chats: [],
      currentChat: {},
      messageInput: '',
      messageType: [
        {
          label: 'Важные сообщения',
          iconPath: require('../assets/messages/star.svg')
        },
        {
          label: 'Спам',
          iconPath: require('../assets/messages/trash.svg')
        },

      ],
      actionInChat: [
        {
          label: 'Поиск по истории сообщений',
          iconPath: require('../assets/messages/search.svg')
        },
        {
          label: 'Отметить непрочитанным',
          iconPath: require('../assets/messages/unread.svg')
        },
        {
          label: 'Закрепить в списке чатов',
          iconPath: require('../assets/messages/fix.svg')
        },
        {
          label: 'Заблокировать',
          iconPath: require('../assets/messages/block.svg')
        },
        {
          label: 'Пожаловаться',
          iconPath: require('../assets/messages/complain.svg')
        },

      ]
    }
  },
  methods: {
    ...mapGetters(['getUnreadChats']),
    visibilityChanged(isVisible, entry) {
      this.isVisible = isVisible;
      if (isVisible) {
        let message = entry.target;
        const status = message.getAttribute('data-status');
        const id = message.getAttribute('data-id');

        if (status === '1') {
          ApiWrapper.readMessage({chatId: this.currentChat.id, messageId: id});

          const [filterObj] = this.currentChat.messages.filter((e) => e.id == id);

          if (filterObj.message_author_id !== this.getAuthorizedProfile.userId) {
            filterObj.status = 2;
          }
        }

      }
    },
    getChatMessages: async function () {
      let messages = (await ApiWrapper.getChatMessages({chatId: this.currentChat.id})).data;
      this.currentChat.messages = messages;

      for (let message of messages) {
        //console.log(message);
      }

      nextTick(() => {
        this.$refs.messages.scrollTo({
          top: this.$refs.messages.scrollHeight
        })
      })
    },
    getAllChats: async function () {
      this.chats = (await ApiWrapper.getAllChats()).data;

      for (let chat of this.chats) {



        let otherChatMember = chat.members.filter(member => member.user_id !== this.getAuthorizedProfile.userId)[1]?.id;

        if (!otherChatMember) {
          otherChatMember = 2;
        }

        let profile = await ApiWrapper.getProfile({id: otherChatMember});
        chat.icon = profile.data.profile_path;
        chat.name = profile.data.name;
      }

      this.chats = this.chats.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)


      if (this.chats.length === 1) {
        this.currentChat = this.chats[0];
      }


    },
    sendMessage: async function () {
      if (this.messageInput) {
        await ApiWrapper.sendMessage({chatId: this.currentChat.id, message: this.messageInput});
        this.getAllChats();
        this.getChatMessages();

        this.messageInput = '';
      }
    }
  },
  computed: {
    ...mapGetters(['getAuthorizedProfile'])
  },
  watch: {
    currentChat() {

      const url = new URL(location.href);
      url.searchParams.set('chat-id', this.currentChat.id);

      history.pushState(null, '', url);

      this.getChatMessages();
    }
  },
  async mounted() {
    await this.getAllChats();

    this.sockets.subscribe('chat-message', async (data) => {
      this.msg = data.message;
      var audio = new Audio(require('../assets/newmessage.mp3')); // path to file
      audio.play()
      this.getAllChats();
      this.getChatMessages();
    });

    const url = new URL(location.href);
    let targetChatId = url.searchParams.get('chat-id');

    if (targetChatId) {

      this.currentChat = this.chats.find(el => el.id == targetChatId);

    }


  }
}
</script>

<style lang="scss">

.messages-body {
  min-height: 115vh;
  display: grid;
  grid-template-columns: 2fr 3fr 15fr 3fr;
  background-color: var(--secondary-color);

  .full-width {
    grid-column: 3 / 4;
    margin-top: 105px;

    display: grid;
    grid-template-columns: 1fr 2fr;

    .left-block {

      display: flex;
      flex-direction: column;

      .search {
        display: flex;
        align-items: center;
        background: white;
        border-radius: 10px;
        justify-content: space-around;
        height: 60px;

        .search-icon {
          img {
            height: 50%;
          }
        }

        .dropdown {
          position: relative;
        }
      }

      .chats {
        margin-top: 20px;
        border-radius: 10px;
        background: white;
        font-family: var(--base-font);
        height: calc(100vh - 175px);
        padding-bottom: 29px;

        .chat-item {
          height: 70px;
          overflow: hidden;


          &.selected {
            background: #fbfbfb;
            color: white;
          }

          .bottom-divider {
            border-bottom: 1px solid #EDEEF0;
            width: 80%;
            height: 1px;
            margin: 0 0 0 auto;
          }

          .item-wrapper {
            display: grid;
            grid-template-columns: 1fr 4fr 1fr;
            height: 70px;

            .profile-picture {
              height: auto;

              img {
                width: 50px;
                height: 50px;
              }
            }

            .body {
              display: flex;
              flex-direction: column;
              justify-content: center;
              text-align: left;
              font-size: 14px;
              margin-left: 20px;

              p {
                max-width: 20ch;
                color: rgba(0, 0, 0, 0.6);
                max-height: 3ch;
              }
            }

            .status {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-start;
              margin-right: 10px;
              margin-top: 10px;
              font-size: 12px;
            }
          }
        }

      }

    }

    .check__mark:after {
      content: url(../assets/home-view/check-mark.svg);
      margin-left: 5px;
      position: relative;
      top: 3px;
      width: 50px;
      height: 50px;
    }
    .name__check:after {
      content: url(../assets/home-view/check-mark.svg);
      margin-left: 5px;
      position: relative;
      top: 3px;
      width: 50px;
      height: 50px;
    }
    .user__checked:after {
      content: url(../assets/home-view/check-mark.svg);
      margin-left: 5px;
      position: relative;
      top: 3px;
      width: 50px;
      height: 50px;
    }

    .right-block {
      display: flex;
      margin-left: 20px;
      background: white;
      height: calc(100vh - 100px);
      padding-bottom: 29px;

      .chat-room {
        width: 100%;
        display: flex;
        flex-direction: column;

        .chat-name {
          display: flex;
          align-items: center;
          height: 50px;
          margin: 10px 13px 0 20px;
          justify-content: space-between;

          .flex {
            justify-content: center;
            display: flex;
            align-items: center;
          }

          .dropdown {
            position: relative;
          }

          .chat-name-img {
            height: 40px;
            width: 40px;
            border-radius: 50px;
          }

          h3 {
            margin-left: 20px;
          }
        }
      }

      .chat-content {
        font-family: var(--base-font);
        position: relative;
        height: 100%;

        .messages {
          height: calc(100vh - 240px);
          overflow-y: scroll;


          .message {
            width: 95%;
            margin: 0 auto 0 auto;

            &.unread {
              background: #F0F2F5;
            }

            .message-data {
              display: flex;
              align-items: center;

              .logo {
                img {
                  width: 40px;
                  height: 40px;
                  border-radius: 100px;
                  margin-top: 5px;
                }
              }

              .user-name {
                margin-left: 20px;
                color: #FF431A;
                font-size: 18px;
                line-height: 22px;
                display: flex;
                flex-direction: column;
              }

              .sent_at {
                margin-left: 10px;
                font-weight: 400;
                font-size: 15px;
                color: rgba(0, 0, 0, 0.6);
              }
            }

            .message-content {
              text-align: left;
              margin-left: 65px;
            }
          }
        }


        .message-input {
          display: flex;
          align-items: center;
          width: 99%;
          position: absolute;
          padding-left: 10px;
          margin-top: 20px;
          padding-top: 20px;
          background: #efefef;
          border-top: 1px rgb(177 177 177 / 60%) solid;
        }
      }
    }

  }
}
@media screen and (max-width: 1500px) {
  .messages-body {
    grid-template-columns: 1fr 3fr 15fr 1fr;
  }
}

@media screen and (max-width: 1480px) {
  .header .menu-buttons {
    padding-left: 20px;
    position: relative;
  }
  .header {
    grid-template-columns: 2fr 37fr 3fr;
  }
  .header .header-content {
    grid-template-columns: 1fr 4fr 2fr 1fr;
  }

}


@media screen and (max-width: 769px) {
  .messages-body .full-width{
    display: flex;
    flex-direction: column;
    margin-top: 80px;
  }
  .messages-body .full-width .left-block .chats {
    height: calc(50vh - 175px);
  }
  .messages-body .full-width .right-block {
    margin-left: 0;
    margin-top: 20px;
  }
  .messages-body {
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 500px) {
  .messages-body .full-width{
    display: flex;
    flex-direction: column;
  }
  .messages-body .full-width .left-block .chats {
    height: calc(50vh - 175px);
  }
  .messages-body .full-width .right-block {
    margin-left: 0;
    margin-top: 20px;
  }
  .messages-body {
    grid-template-columns: 1fr 1fr 15fr 1fr;
  }
}
</style>