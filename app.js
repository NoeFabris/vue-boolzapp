

const app = new Vue ({
        el: '#boolzapp', 
        data: {
            usersList: globalUsersList,
            selectedUser: {},
            searchInput: '',
            newMsg: ''
        },
        computed: {
            
            searchedChat() {

                return this.usersList.filter((element) => {
                    return element.name.toLowerCase().startsWith(this.searchInput.toLowerCase())
                }) 
            }
        },
        methods: {
            
            selectedContact(contact){
                return this.selectedUser = contact
            },
            msgTime(time) {
                return moment(time, 'DD/MM/YYY HH:mm:ss').format('HH:mm')
            },
            sendNewMsg() {
                
                let msgFormat = {
                    date: moment().format('DD/MM/YYY HH:mm:ss'),
                    text: this.newMsg,
                    status : 'sent'
                }
                let openChat = this.selectedUser.name
                this.selectedUser.messages.push(msgFormat);
                
                this.newMsg = ''
                setTimeout(() => {
                    if (this.selectedUser.name === openChat) {
                        let msgResponseFormat = {
                            date: moment().format('DD/MM/YYY HH:mm:ss'),
                            text: 'Ok',
                            status : 'received'
                        }
                        this.selectedUser.messages.push(msgResponseFormat)
                    }
                }, 1000) () 
                
            },
            deleteInputSearch() {
                this.searchInput = ''
            },
            lastMsg(chat) {
                if ((chat.length) === 0) {
                    return 'Non ci sono mesaggi'
                } else {
                    let lastMsg = chat[chat.length - 1]
                    if (lastMsg.text.length > 20) {
                        return (lastMsg.text).slice(0, 20) + '...'
                    } else {
                        return lastMsg.text
                    }
                }
            },
            lastMsgTime(chat) {
                if ((chat.length) === 0) {
                    return
                } else {
                    let lastMsg = chat[chat.length - 1]
                    return this.msgTime(lastMsg.date)
                }
            },
            lastAccess(chat) {
                if ((chat.length) === 0) {
                    return ''
                } else {
                    let lastMsg = chat[chat.length - 1]
                    if (lastMsg.status === 'received') {
                        return `Ultimo accesso ${this.msgTime(lastMsg.date)}`
                    } else {
                        lastMsg = chat[chat.length - 2]
                        if (lastMsg.status === 'received') {
                            return `Ultimo accesso ${this.msgTime(lastMsg.date)}`
                        }
                        return 'Online'
                    }
                }
            },
            showPopup(chat, event) {
                chat.popUp = true
                
                event.currentTarget.focus()
            },
            mouseOut(chat){
                chat.popUp = false
            },
            deleteMsg(index) {
                this.selectedUser.messages.splice(index, 1)
                chat.popUp = false
            }
            
        }, 
        mounted(){
            this.selectedUser = this.usersList[0]

            this.usersList.forEach(user => {
                user.messages.forEach(message => {
                    this.$set(message, 'popUp', false)
                });
            });
        }
})
