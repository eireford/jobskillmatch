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
        posts: []
    },
    mutations: {
        setUserProfile(state, val) {
            state.userProfile = val
        },
        setPerformingRequest(state, val) {
            state.performingRequest = val
        },
        setPosts(state, val) {
            state.posts = val
        },
        setJobs(state, val) {
            state.jobs = val
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
        // eslint-disable-next-line no-unused-vars
        async createJob({state, commit}, job) {
            // create job in firebase
            await fb.jobsCollection.add({
                createdOn: new Date(),
                postingId: job.postingId,
                title: job.title,
                userId: fb.auth.currentUser.uid,
                userName: state.userProfile.name,
                comments: 0,
                likes: 0
            })
        },
        // eslint-disable-next-line no-unused-vars
        async likeJob({commit}, job) {
            const userId = fb.auth.currentUser.uid
            const docId = `${userId}_${job.id}`

            // check if user has liked job
            const doc = await fb.jobLikesCollection.doc(docId).get()
            if (doc.exists) {
                return
            }

            // create job
            await fb.jobLikesCollection.doc(docId).set({
                jobID: job.id,
                userId: userId
            })

            // update job likes count
            await fb.jobsCollection.doc(job.id).update({
                likes: job.likesCount + 1
            })
        },
        async updateProfile({dispatch}, user) {
            const userId = fb.auth.currentUser.uid
            // update user object
            // eslint-disable-next-line no-unused-vars
            const userRef = await fb.usersCollection.doc(userId).update({
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