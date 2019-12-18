<template>
    <v-card class="pa-2">
        <h1 class="">
            <v-icon large>mdi-account-plus</v-icon> Register
        </h1>
        <v-form class="" ref="form"
                v-model="valid"
                lazy-validation
                style="width: 100%">
            <v-layout class="pa-3" row wrap>
                <v-flex class="pa-2" xs12 sm12 md6>
                    <h2>Villkor*</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eu fermentum turpis. Morbi vulputate est vel risus scelerisque commodo. Donec consectetur lacinia elit, at aliquam nunc. Vivamus a nibh massa. Nullam condimentum ullamcorper purus ut vulputate. Proin a tortor eu mauris tempor iaculis vitae sed dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ac pulvinar quam, vel sollicitudin enim. Etiam viverra porttitor lectus quis sagittis. Fusce nec orci convallis, ultrices eros et, suscipit dolor. Morbi suscipit tristique placerat. Proin fringilla aliquet nisi, eget pretium mi. Praesent a auctor purus. Pellentesque posuere scelerisque lobortis. Aenean malesuada rhoncus lacus sed accumsan.</p>
                </v-flex>
                <v-flex class="pa-2" xs12 sm12 md6>
                    <h2>Följande kan du göra som registrerad användare:*</h2>
                    <ul>
                        <li>Spara en konfiguration</li>
                        <li>Skicka en förfrågan</li>
                        <li>Skicka en förfrågan med flera konfigurationer</li>
                    </ul>
                </v-flex>
            </v-layout>
            <v-layout class="pa-3" row wrap>
                <v-flex class="px-2" xs12 sm12 md6 lg6 xl6>
                    <v-text-field v-model="firstName"
                                  label="First name"
                                  placeholder="First name"
                                  :counter="40"
                                  :rules="firstNameRules"
                                  required></v-text-field>

                    <v-text-field v-model="lastName"
                                  :counter="40"
                                  :rules="lastNameRules"
                                  required></v-text-field>

                    <v-text-field v-model="email"
                                  :rules="emailRules"
                                  required></v-text-field>
                </v-flex>
                <v-flex class="px-2" xs12 sm12 md6 lg6 xl6>

                    <v-text-field v-model="password"
                                  :counter="15"
                                  :rules="passwordRules"
                                  required></v-text-field>

                    <v-text-field v-model="retypedPassword"
                                  :counter="15"
                                  :rules="retypedPasswordRules"
                                  required></v-text-field>
                    <v-checkbox color="primary" v-model="agreed" label="Jag godkänner behandlingen av mina personuppgifter för detta ändamål i enlighet med dataskyddsinformationen på webbplatsen, som jag har läst, förstått och accepterat."></v-checkbox>
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
                        redirectUrl: this.redirectUrl
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