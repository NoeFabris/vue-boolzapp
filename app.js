

const app = new Vue ({
        el: '#boolzapp', 
        data: {
            usersList: globalUsersList,
            selectedUser: {}
        },
        methods: {
            selectedContact(contact){
                this.selectedUser = contact
            },
            msgTime(time) {
                return moment(time, 'DD/MM/YYY HH:mm:ss').format('HH:mm')
            }

        }, 
        mounted(){
            this.selectedUser = this.usersList[0]
        }
})
