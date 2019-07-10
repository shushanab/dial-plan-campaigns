<template>
    <v-app id="inspire">
        <v-snackbar
            v-model="snackbar"
            multi-line
            top
            :timeout="snackbarTimeout"
            :color="snackbarColor"
        >
            <p class="snackbar-message">{{ snackbarText }}</p>
            <v-btn
                flat
                color="black"
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-dialog
            v-model="dialog"
            scrollable
            :width="dialogWidth"
        >
            <v-card>
                <v-card-title class="headline selected-company-title-placeholder">{{ dialogTitle }}
                    <span class="selected-company-title">
                        {{ selectedCompany }} {{ selected }}
                    </span>
                </v-card-title>

                <v-card-text class="fixed-height">
                    <v-container grid-list-md text-xs-center>
                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-text-field
                                    class="edit-phone"
                                    label="Phone number"
                                    v-model="selectedCompanyPhone"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-list>
                                    <v-list-tile disabled>{{ selectedCompaniesPlaceholder }}
                                    </v-list-tile>
                                    <draggable
                                        v-model="selComp"
                                        group="companies"
                                        ghost-class="ghost"
                                        v-bind="dragOptions"
                                        @start="drag=true"
                                        @end="drag=false"
                                        class="list-group"
                                    >
                                        <transition-group  type="transition" :name="!drag ? 'flip-list' : null">
                                            <v-list-tile v-for="company in selComp" :key="company.id"
                                                class="list-group-item">
                                                {{ company.name }}
                                            </v-list-tile>
                                        </transition-group>
                                    </draggable>
                                </v-list>
                            </v-flex>
                            <v-flex xs6>
                                <v-list>
                                    <v-list-tile disabled>{{ allCompaniesPlaceholder }}
                                    </v-list-tile>
                                        <draggable
                                            v-model="allCompanies"
                                            group="companies"
                                            ghost-class="ghost"
                                            v-bind="dragOptions"
                                            @start="drag=true"
                                            @end="drag=false"
                                            class="list-group"
                                        >
                                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                                <v-list-tile v-for="company in allCompanies" :key="company.id"
                                                    class="list-group-item">
                                                    {{ company.name }}
                                                </v-list-tile>
                                            </transition-group>
                                        </draggable>
                                </v-list>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false"
                    >Cancel</v-btn>

                    <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false"
                    >Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card class="elevation-0">
            <v-card-title>
                <p class="display-1 page-title">{{ title }}</p>
                <v-spacer></v-spacer>
                <v-flex sm2>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        single-line
                        hide-details
                        outlined
                    ></v-text-field>
                </v-flex>
            </v-card-title>
            <v-data-table
                id="items-table"
                loading-text="Loading... Please wait"
                :loading="loading"
                :headers="headers"
                :items="items"
                :search="search"
                :pagination.sync="pagination"
                item-key="name"
            >
                <template v-slot:headers="props">
                    <tr>
                        <th
                            v-for="header in props.headers"
                            :key="header.text"
                            :class="['column sortable title text-sm-left ',
                                header.class,
                                pagination.descending ? 'desc' : 'asc',
                                header.value === pagination.sortBy ? 'active' : ''
                            ]"
                            @click="header.sortable && changeSort(header.value)"
                        >{{ header.text }}
                            <v-icon small v-if="header.sortable">arrow_upward</v-icon>
                        </th>
                    </tr>
                </template>
                <template v-slot:items="props">
                    <tr :key="props.item.id"
                        :active="props.item.selected"
                        :class="{'selectedRow': props.item.selected}"
                        @click="selectRow(props.item)"
                    >
                        <td class="text-xs-left subheading">{{ props.item.name }} {{ props.item.id }}</td>
                        <td class="text-xs-left subheading">{{ props.item.phone }}</td>
                        <td class="text-xs-left">
                            <v-btn depressed @click="editRow(props.item)">Edit
                                <v-icon small right>edit</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </v-card>
    </v-app>
</template>

<script>
import draggable from 'vuedraggable'

const faker = require('faker');

export default {
    name: 'filtering-table',
    components: {
        draggable
    },
    data() {
        return {
            title: 'Dial Plan',
            dialogTitle: 'Edditing company ',
            dialog: false,
            dialogWidth: '800',
            snackbar: false,
            snackbarText: '',
            snackbarColor: 'warning',
            snackbarTimeout: 6000,
            selected: null,
            selectedCompany: null,
            selectedCompanyPhone: null,
            selectedCompaniesPlaceholder: 'Selected Company(es)',
            allCompaniesPlaceholder: 'All Companies',
            search: '',
            drag: false,
            loading: true,
            pagination: {
                rowsPerPage: '10',
                sortBy: 'name'
            },
            selComp: [],
            allCompanies: [
                {
                    'name': faker.company.companyName(),
                    'id': 40
                },
                {
                    'name': faker.company.companyName(),
                    'id': 41
                },
                {
                    'name': faker.company.companyName(),
                    'id': 42
                },
                {
                    'name': faker.company.companyName(),
                    'id': 43
                },
                {
                    'name': faker.company.companyName(),
                    'id': 44
                }
            ],
            headers: [
                {
                    text: 'Company Name',
                    value: 'name',
                    class: 'company-name',
                    sortable: true
                },
                {
                    text: 'Phone number',
                    value: 'phone',
                    class: 'phone-number',
                    sortable: true
                },
                {
                    text: 'Action',
                    value: 'action',
                    class: 'action-edit',
                    sortable: false
                }
            ],
            items: [
                {
                    id: 1,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                },
                {
                    id: 2,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                },
                {
                    id: 3,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                },
                {
                    id: 4,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                },
                {
                    id: 5,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                },
                {
                    id: 6,
                    name: faker.company.companyName(),
                    phone: faker.phone.phoneNumber(),
                    action: 'edit',
                    selected: false
                }
            ]
        }
    },
    content: {
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost'
            };
        }
    },
    methods: {
        selectRow(el) {
            this.items.filter((item) => {
                if(item.id === el.id) {
                    item.selected = true;
                    this.selectedCompany = el.name;
                    this.selected = el.id;
                    this.selectedCompanyPhone = el.phone;
                }
                else {
                    item.selected = false;
                }
            })
            // console.log('ID: ', id);
        },
        editRow(el) {
            this.items.filter((item) => {
                if(item.id === el.id) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            });
            if(!this.selComp.length) {
                this.selComp.push(el);
                this.dialog = true;
            }
            else {
                this.selComp.forEach((item, i) => {
                    if(item.id !== el.id) {
                        console.log('IF ID: ', el.id);
                        this.selComp.push(el);
                        this.dialog = true;
                    }
                    else {
                        console.log('ID: ', el.id);
                        this.snackbar = true;
                        this.snackbarText = 'Sorry, this company already Exists, please try anouther one!';
                        return false;
                    }
                });
            }
        },
        changeSort(column) {
            console.log('SORTING BY COLUMN: ', column);
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending;
            }
            else {
                this.pagination.sortBy = column;
                this.pagination.descending = false;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 3000);
    }
}
</script>

<style lang="stylus">
.selectedRow {
    background: #E8F5E9!important;
}

.page-title {
    padding-left: 10px;
}

.fixed-height {
    height: 648px!important;
}

.edit-phone {
    padding-left: 10px;
}

.snackbar-message {
    font-size: 16px;
    font-weight: 500;
    letter-spaceing: 0.5;
}

.selected-company-title-placeholder {
    padding-left: 46px!important;
    padding-top: 34px!important;
    .selected-company-title {
        font-weight: 500;
        padding-left: 8px;
    }
}

.flip-list-move {
    -webkit-transition: -webkit-transform 0.5s;
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    transition: transform 0.5s, -webkit-transform 0.5s;
}

.no-move {
    -webkit-transition: -webkit-transform 0s;
    transition: -webkit-transform 0s;
    transition: transform 0s;
    transition: transform 0s, -webkit-transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
    .list-group-item {
        cursor: move;
    }
    .list-group-item i {
       cursor: pointer;
    }
}
</style>
