<template>
       
    <div class="flex items-center justify-center">
        <label for="Quantity" class="sr-only"> Quantity </label>

        <div class="flex items-center border border-gray-200 rounded">
            <button
            @click="inc(-1)"
            type="button"
            :class="value <= quantity.min ? 'bg-primary text-white' : ''"
            class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
            >
            &minus;
            </button>

            <input
            type="number"
            id="Quantity"
            v-model="value"
            value= value
            :min="quantity.min" :max="quantity.max"
            class="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
                @click="inc(1)"
            type="button"
            :class="value >= quantity.instock ? 'bg-primary text-white' : ''"
            class="w-10 h-10 leading-10 text-gray-600 transition hover:opacity-75"
            >
            &plus;
            </button>
        </div>
    </div>

    
</template>

<script>
export default {
    props: {
        quantity: Object,
    },
    data() {
        return {
            value: this.quantity.value || this.quantity.default || 1
        }
    },
    watch:{
        value(val){
            if(val > this.quantity.instock) this.value = this.quantity.instock;
            if(val < this.quantity.min) this.value = this.quantity.default;
            if(isNaN(val)) this.value = this.quantity.default;
            this.$emit('selected', this.value);
        }
    },
    methods: {
        inc(inc){
            this.value = Number(this.value) + (Number(this.quantity.increment) * Number(inc))
        }
    },
}
</script>