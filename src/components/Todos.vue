<template>
    <v-container fluid>
        <v-col cols="12">
            <v-row align="center"
                   justify="center">

               <div :key="index"
                     v-for="(todo, index) in listOfTodos">
                    <v-layout justify-center wrap>
                        <v-flex xs10 sm10 md10 fill-height>

                         

                            <v-card class="mx-auto ma-5"
                                    max-width="400">
                                <v-img class="white--text align-end"
                                       height="200px"
                                       src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">

                                    <v-card-title> {{todo.name}}</v-card-title>
                                </v-img>

                                <v-card-subtitle class="pb-0">ToDo nummer {{todo.id}}</v-card-subtitle>

                                <v-card-text v-if="todo.published == false" class="text--primary">
                                    <v-chip color="deep-orange" style="color:white;">Pågående</v-chip>
                                </v-card-text>

                                <v-card-text v-else class="text--primary">
                                    <v-chip color="success">Färdig</v-chip>
                                </v-card-text>

                                <v-card-actions class="pa-0">
                                    <v-btn color="red"
                                           text @click="removeItem(todo.id)">Ta bort</v-btn>
                                    <v-btn color="primary"
                                           text @click="addToCart(todo)">+ kundvagn</v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn v-if="todo.published == false" color="green" text @click="markAsDone(todo)">Färdig</v-btn>
                                    <v-btn v-else color="orange" text @click="markAsDone(todo)">Pågår</v-btn>
                                </v-card-actions>
                            </v-card>
                         
                        </v-flex>
                    </v-layout>
                </div>

            </v-row>
        </v-col>


    </v-container>
</template>


        <!--<ul style="list-style-type: none!important;">-->
          
      
    


<script>
    export default {
        props: {
            listOfTodos: Array,
        },
        data: function () {
            return {

               
            }
        },
        methods: {
            removeItem(id) {
                this.$emit('openRemoveDialog', id);
            },
            addToCart(product) {
                this.$emit('addToCart', product);
            },
            markAsDone(todo) {
                this.overlay = true,
                this.$emit('done', todo);
            /* eslint-disable no-console */
                console.log(todo);
            /* eslint-enable no-console */
            }
        }
    }
</script>

<style scoped>
    .btn {
        position: relative;
        display: block;
        margin: 30px auto;
        padding: 0;
        overflow: hidden;
        border-width: 0;
        outline: none;
        border-radius: 2px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
        background-color: #2ecc71;
        color: #ecf0f1;
        transition: background-color .3s;
    }

        .btn:hover, .btn:focus {
            background-color: #27ae60;
        }

        .btn > * {
            position: relative;
        }

        .btn span {
            display: block;
            padding: 12px 24px;
        }

        .btn:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            width: 0;
            padding-top: 0;
            border-radius: 100%;
            background-color: rgba(236, 240, 241, .3);
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .btn:active:before {
            width: 120%;
            padding-top: 120%;
            transition: width .2s ease-out, padding-top .2s ease-out;
        }

    /* Styles, not important */
    *, *:before, *:after {
        box-sizing: border-box;
    }

    html {
        position: relative;
        height: 100%;
    }

    body {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background-color: #ecf0f1;
        color: #34495e;
        font-family: Trebuchet, Arial, sans-serif;
        text-align: center;
    }

    h2 {
        font-weight: normal;
    }

    .btn.orange {
        background-color: #e67e22;
    }

        .btn.orange:hover, .btn.orange:focus {
            background-color: #d35400;
        }

    .btn.red {
        background-color: #e74c3c;
    }

        .btn.red:hover, .btn.red:focus {
            background-color: #c0392b;
        }
</style>
