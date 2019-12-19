<template>
    <v-card class="pa-2">
        <div class="text-center">
            <v-dialog v-model="agreementDialog"
                      width="500">
                <v-card>
                    <v-card-title class="headline grey lighten-2"
                                  primary-title>
                        Terms of use
                    </v-card-title>

                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary"
                               text
                               @click="agreementDialog = !agreementDialog">
                            I accept
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>



        <h1 class="">
            <v-icon large>mdi-account-plus</v-icon> Register
        </h1>
        <v-form class="" ref="form"
                v-model="valid"
                lazy-validation
                style="width: 100%">
            <v-layout class="pa-3" row wrap>
                <v-flex class="px-2" xs12 sm12 md6 lg6 xl6>
                    <v-text-field v-model="firstName"
                                  label="First name"
                                  placeholder="First name"
                                  :counter="40"
                                  :rules="firstNameRules"
                                  required></v-text-field>

                    <v-text-field v-model="lastName"
                                  label="Last name"
                                  placeholder="Last name"
                                  :counter="40"
                                  :rules="lastNameRules"
                                  required></v-text-field>

                    <v-text-field v-model="email"
                                  label="E-mail address"
                                  placeholder="E-mail address"
                                  :rules="emailRules"
                                  required></v-text-field>
                </v-flex>
                <v-flex class="px-2" xs12 sm12 md6 lg6 xl6>

                    <v-text-field v-model="password"
                                  label="Password"
                                  placeholder="Password"
                                  :counter="15"
                                  :rules="passwordRules"
                                  required></v-text-field>

                    <v-text-field v-model="retypedPassword"
                                  label="Retype password"
                                  placeholder="Retype password"
                                  :counter="15"
                                  :rules="retypedPasswordRules"
                                  required></v-text-field>
                    <v-checkbox color="primary" v-model="agreed" 
                                label="
                               I agree to the terms of use."></v-checkbox>
                    <v-btn text color="primary" @click="agreementDialog = !agreementDialog">Terms of use</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid"
                   color="success"
                   @click="register()">
                Skicka
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<style scoped>
    .hidden {
        display: none;
    }
</style>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        data() {
            return {
                agreementDialog: false,
                valid: true,
                agreed: false,

                firstName: '',
                firstNameRules: [
                    v => !!v || 'First name is required',
                    v => (v && v.length <= 40) || 'First name must be less than 40 characters'
                ],

                lastName: '',
                lastNameRules: [
                    v => !!v || 'Last name is required',
                    v => (v && v.length <= 40) || 'Last name must be less than 40 characters'
                ],

                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],

                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Password must contain at least 8 characters'
                ],

                retypedPassword: '',
                retypedPasswordRules: [
                    v => !!v || 'Retyped password is required',
                    v => (v && v.length >= 8) || 'Retyped password must contain at least 8 characters'
                ],


                
            }
        },
        methods: {
            ...mapActions({
                registerNewUser: 'login/REGISTER_NEW_USER'
            }),
            register() {
                if (this.password === this.retypedPassword) {
                    this.registerNewUser({
                        vm: {
                            firstName: this.firstName,
                            lastName: this.lastName,
                            email: this.email,
                            password: this.password
                        },
                        //TODO redirect on register hehe
                        redirectUrl: '/'
                    })
                } else {
                    //TODO: return validation error
                }
            }

        },
        computed: {
            ...mapState({
                redirectUrl: state => state.login.redirectUrl
            })
        },
        components: {
        }
    }
</script>