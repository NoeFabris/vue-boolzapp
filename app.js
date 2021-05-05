

const app = new Vue ({
        el: '#boolzapp', 
        data: {
            usersList: globalUsersList,
            selectedUser: {},
            searchedUsers: {},
            searchInput: '',
            newMsg: ''
        },
        computed: {
            searchedChat() {
                if (!this.searchInput) {
                    console.log('no ricerche')
                    this.searchedUsers = this.usersList
                } else {
                    console.log('ricerca')

                    let search = this.usersList.filter((searchName) => searchName.name == this.searchInput )
                    console.log(search)
                    this.searchedUsers = search

                }
            }
        },
        methods: {
            selectedContact(contact){
                this.selectedUser = contact
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
                this.selectedUser.messages.push(msgFormat);

                setTimeout(() => {
                    let msgResponseFormat = {
                        date: moment().format('DD/MM/YYY HH:mm:ss'),
                        text: 'Ok',
                        status : 'received'
                    }
                    this.selectedUser.messages.push(msgResponseFormat)
                }, 1000) ()
                // response() ({
                // } 1000)
            }

        }, 
        mounted(){
            this.selectedUser = this.usersList[0]
        }
})
