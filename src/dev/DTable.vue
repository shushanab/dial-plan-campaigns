<template>
    <v-app id="inspire">
        <v-dialog
            v-model="dialog"
            width="800"
            height="500"
        >
            <v-card>
                <v-card-title class="headline">{{ dialogTitle }} {{ selected }}</v-card-title>

                <v-card-text>
                    Drag and drop functionality will be here!
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
                        @click="selectRow(props.item.id)"
                        :class="{'selectedRow': props.item.selected}"
                    >
                        <td class="text-xs-left subheading">{{ props.item.name }}</td>
                        <td class="text-xs-left subheading">{{ props.item.phone }}</td>
                        <td class="text-xs-left">
                            <v-btn depressed @click="editRow(props.item.id)">Edit
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
const faker = require('faker');

export default {
    name: 'filtering-table',
    components: {
    },
    data() {
        return {
            title: 'Dial Plan',
            dialogTitle: 'Edditing row number',
            dialog: false,
            selected: null,
            search: '',
            loading: true,
            pagination: {
                sortBy: 'name'
            },
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
                }
            ]
        }
    },
    content: {
    },
    methods: {
        selectRow(id) {
            this.items.filter((item) => {
                if(item.id === id) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            })
            this.selected = id;
            // console.log('ID: ', id);
        },
        editRow(id) {
            this.items.filter((item) => {
                if(item.id === id) {
                    item.selected = true;
                }
                else {
                    item.selected = false;
                }
            });
            this.dialog = true;
            console.log('ID: ', id);
        },
        changeSort(column) {
            console.log('SORTING BY COLUMN: ', column);
            this.loading = true;
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending;
            }
            else {
                this.pagination.sortBy = column;
                this.pagination.descending = false;
            }
            this.loading = false;
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 2000);
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
</style>
