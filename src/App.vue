<template>
    <v-app>
        <div class="app">
            <v-select
                class="groupby-dropdown"
                :items="groupByItems"
                v-model="groupByType"
                outlined
                label="Group posts by">
            </v-select>
            <v-list-group
                value="true">
                <template
                    v-slot:activator>
                    <v-list-item-title>View Posts</v-list-item-title>
                </template>
                <v-list-group
                    sub-group
                    v-for="postArr in groupPosts"
                    :key="postArr.id">
                    <template
                        v-slot:activator>
                        <v-list-item-title>
                            {{groupByType === 'week' ? displayWeeks(postArr.name) : postArr.name}}
                        </v-list-item-title>
                    </template>
                    <v-list-item
                        v-for="post in postArr.posts"
                        :key="post.id">
                        <div class="post-cards">
                            <v-card>
                                <v-card-title>{{ post.author }}<small>, {{ post.location }}</small></v-card-title>
                                <v-card-text>
                                    <div>{{ post.text }}</div>
                                    <div class="posted-on">Posted On: {{ getFormattedDate(post.time) }}</div>
                                    <v-form
                                        class="post-form">
                                        <v-text-field
                                            label="Author"
                                            :value="post.author"
                                            :ref="post.id+'-author'"
                                        ></v-text-field>
                                        
                                        <v-text-field
                                            label="Location"
                                            :value="post.location"
                                            :ref="post.id+'-location'"
                                        ></v-text-field>
                                        <v-btn
                                            class="mr-4"
                                            color="primary"
                                            @click.prevent="savePost(post.id)"
                                        >
                                            Save
                                        </v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-list-item>
                </v-list-group>
            </v-list-group>
        </div>
    </v-app>
</template>

<script>
    import { groupBy } from 'lodash'

    export default {
        name: 'App',
        data() {
            return {
                postsList: [],
                groupByType: 'week',
                groupByItems: ['author', 'location', 'week']
            }
        },
        mounted() {
            this.getPosts()
        },
        methods: {
            async getPosts() {
                try {
                    let postsList = await fetch('/api/posts')
                    postsList = await postsList.json()
                    postsList.forEach(post => {
                        const epochMilliseconds = post.time * 1000
                        const delta = Math.abs(epochMilliseconds - Date.now()) / 1000
                        post.week = Math.floor(delta / 604800)
                    })
                    this.postsList = postsList
                } catch (e) {
                    console.error(e)
                }
            },
            getFormattedDate(timestamp) {
                const date = new Date(timestamp * 1000)
                const dateInNum = date.getDate()
                const monthInNum = date.getMonth()
                const year = date.getFullYear()
                const hours = date.getHours()
                const minutes = '0' + date.getMinutes()
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December']
                return `${dateInNum} ${months[monthInNum]}, ${year} at ${hours}:${minutes.substr(-2)}`
            },
            savePost(id) {
                const locationRef = `${id}-location`
                const authorRef = `${id}-author`
                this.postsList.find(post => {
                    if (post.id === id) {
                        post.author = this.$refs[authorRef][0].$refs.input.value
                        post.location = this.$refs[locationRef][0].$refs.input.value
                    }
                })
            },
            displayWeeks(week) {
                return +week === 0 ? 'This week' : +week === 1 ? `${week} week ago` : `${week} weeks ago`
            }
        },
        computed: {
            groupPosts() {
                let posts = JSON.parse(JSON.stringify(this.postsList))

                const grouped = groupBy(posts, this.groupByType)

                return Object.entries(grouped).map((item) => ({
                    name: item[0],
                    posts: item[1],
                }))
            }
        }
    }
</script>

<style>
    .app {
        width: 50%;
        margin-left: 50px;
        margin-top: 50px;
    }
    
    .groupby-dropdown {
        width: 300px;
    }
    
    .post-cards {
        margin: 50px;
        width: 500px;
    }
    
    .post-form {
        width: 50%;
        margin: 30px 0;
    }
    
    .posted-on {
        margin-top: 20px;
    }

</style>
