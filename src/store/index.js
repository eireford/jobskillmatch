import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

fb.jobsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
    let jobsArray = []

    snapshot.forEach(doc => {
        let job = doc.data()
        job.id = doc.id
        jobsArray.push(job)
    })

    store.commit('setJobs', jobsArray)
})

const store = new Vuex.Store({
    state: {
        userProfile: {},
        jobs: [],
        skills: []
    },
    getters: {
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setJobs(state, val) {
            state.jobs = val
        },
        setSkills(state, val) {
            state.skills = val
        }
    },
    actions: {
        async login({dispatch}, form) {
            // sign user in
            const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async signup({dispatch}, form) {
            // sign user up
            const {user} = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title
            })

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({commit}, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()

            // set user profile in state
            commit('setUserProfile', userProfile.data())

            // change route to job list
            if (router.currentRoute.path === '/login') {
                await router.push('/')
            }
        },
        async logout({commit}) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            await router.push('/login')
        },

        async addJob(commit,job) {
            console.log('job',job);
            console.log(fb.auth.currentUser.uid);
            await fb.jobsCollection.add({
                createdOn: new Date(),
                postingId: job.postingId,
                title: job.title,
                userId: fb.auth.currentUser.uid,
            })
        },
        async updateProfile({dispatch}, user) {
            const userId = fb.auth.currentUser.uid
            // update user object
            await fb.usersCollection.doc(userId).update({
                name: user.name,
                title: user.title
            })

            dispatch('fetchUserProfile', {uid: userId})


            // update all jobs by user
            const jobDocs = await fb.jobsCollection.where('userId', '==', userId).get()
            jobDocs.forEach(doc => {
                fb.jobsCollection.doc(doc.id).update({
                    userName: user.name
                })
            })
        }
    }

})

export default store