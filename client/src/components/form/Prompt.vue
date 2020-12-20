<template>
    <v-form-card :callbackAction="callbackAction"
                 prompt
                 @input="$emit('input')"
                 title="אישור פעולה">
        האם אתה בטוח שאתה מעוניין להמשיך בפעולה?
    </v-form-card>
</template>

<script>
    import VFormCard from './VFormCard'

    export default {
        name: "app-prompt-warning",

        components: {
            'v-form-card': VFormCard
        },

        props: {
            callbackAction: {},
        },
    }
</script>
