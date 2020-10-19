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

fb.skillsCollection.orderBy('name', 'desc').onSnapshot(snapshot => {
    let skillsArray = []

    snapshot.forEach(doc => {
        let skill = doc.data()
        skill.id = doc.id
        skillsArray.push(skill)
    })

    store.commit('setJobs', skillsArray)
})

const store = new Vuex.Store({
    state: {
        userProfile: {},
        jobs: [],
        skills: [],
        errorFromServer: false, // error loading data from JSON
        loaded: true, // sets if JSON data loaded
        errorDeleting: false, // error deleting
        newJob: {}
    },
    getters: {
        getJobsByScore: state => {
           return state.jobs.orderBy('score')
        }
    },
    mutations: {
        setUserProfile(state, payload) {
            state.userProfile = payload
        },
        setJobs(state, payload) {
            state.jobs = payload
        },
        setSkills(state, payload) {
            state.skills = payload
        },
        setError(state, payload) {
            state.errorFromServer = payload
        },
        setLoaded(state, payload) {
            state.loaded = payload
        },
        deleteSkill(state, payload) {
            state.skills.splice(payload, 1)
        },
        setDeletingError(state, payload) {
            state.errorDeleting = payload
        }
    },
    actions: {
        async login(context, form) {
            // sign user in
            const {user} = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            await context.dispatch('fetchUserProfile', user)
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

        // eslint-disable-next-line no-unused-vars
        async createJob({dispatch},form) {
            await fb.jobsCollection.add({
                createdOn: new Date(),
                postingId: form.postingId,
                title: form.title,
                //skills: this.newJob.skills,
                userId: fb.auth.currentUser.uid,
            })
        },

        // eslint-disable-next-line no-unused-vars
        async createSkill({dispatch},newSkill) {
            await fb.skillsCollection.add({
                createdOn: new Date(),
                name: newSkill.name,
                weight: newSkill.weight,
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