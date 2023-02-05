<template>
    <section>
      <base-card>
        <h2>Register as a DEV now!</h2>
        <form @submit.prevent="submitForm" action="">
            <div class="form-control" :class="{ invalid: !firstName.isValid }">
                <label for="firstname">Firstname</label>
                <input type="text" id="firstname" v-model.trim="firstName.value" @keyup="clearValidation('firstName')">
                <p v-if="!firstName.isValid">First name field cannot be empty</p>
            </div>
            <div class="form-control" :class="{ invalid: !lastName.isValid }">
                <label for="lastname">Lastname</label>
                <input type="text" id="lastname" v-model.trim="lastName.value" @keyup="clearValidation('lastName')">
                <p v-if="!lastName.isValid">Last name field cannot be empty</p>
            </div>
            <div class="form-control" :class="{ invalid: !description.isValid }">
                <label for="description">Description</label>
                <textarea type="text" id="description" rows="5" v-model.trim="description.value" @keyup="clearValidation('description')"></textarea>
                <p v-if="!description.isValid">Description field cannot be empty</p>
            </div>
            <div class="form-control" :class="{ invalid: !rate.isValid }">
                <label for="rate">Hourly Rate</label>
                <input type="number" id="rate" v-model.number="rate.value" @change="clearValidation('rate') && rate.value <= 0">
                <p v-if="!rate.isValid">Rate field must be greater than 0</p>
            </div>

            <div class="form-control" :class="{ invalid: !areas.isValid }">
                <h3>Areas of Expertise</h3>
                <div>
                    <input type="checkbox" id="frontend" value="frontend" v-model="areas.value" @change="clearValidation('areas')" />
                    <label for="frontend">Frontend developer</label>
                </div>
                <div>
                    <input type="checkbox" id="backend" value="backend" v-model="areas.value" @change="clearValidation('areas')" />
                    <label for="backend">Backend developer</label>
                </div>
                <div>
                    <input type="checkbox" id="fullstack" value="fullstack" v-model="areas.value" @change="clearValidation('areas')" />
                    <label for="fullstack">Full-stack developer</label>
                </div>
                <p v-if="!areas.isValid">At least one field must be selected.</p>
            </div>
            <p v-if="!formIsValid">Please check that all inputs are corretly populated and read the error message for better understanding what needs to be done.</p>
            <base-button class="button">Register</base-button>
        </form>
      </base-card>
    </section>
</template>

<script>
export default {
    data() {
        return {
            firstName: {
              value: '',
              isValid: true,
            },
            lastName: {
              value: '',
              isValid: true,
            },
            description: {
              value: '',
              isValid: true,
            },
            rate: {
              value: null,
              isValid: true,
            },
            areas: {
              value:[],
              isValid: true,
            },
            formIsValid: true,
        }
    },
    methods: {
      clearValidation(input) {
        if (typeof this[input].value !== "number") {
          this[input].isValid = true;
        }

        if(typeof this[input].value === "number" && this[input].value > 0) {
          this[input].isValid = true;
        }
      },
      validateForm () {
        this.formIsValid = true;

        if (this.firstName.value === '') {
          this.firstName.isValid = false;
          this.formIsValid = false;
        }

        if (this.lastName.value === '') {
          this.lastName.isValid = false;
          this.formIsValid = false;
        }

        if (this.description.value === '') {
          this.description.isValid = false;
          this.formIsValid = false;
        }

        if (!this.rate.value || this.rate.value < 0) {
          this.rate.isValid = false;
          this.formIsValid = false;
        }

        if (this.areas.value.length === 0) {
          this.areas.isValid = false;
          this.formIsValid = false;
        }
      },
      submitForm() {
        this.validateForm();

        if(!this.formIsValid) {
          return
        }

        const formData = {
          firstName: this.firstName.value,
          lastName: this.lastName.value,
          description: this.description.value,
          rate: this.rate.value,
          areas: this.areas.value,
        };

        this.$store.dispatch('addDev', formData);
        this.$router.replace('/devs');
      },
    }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 5px;
}

input:focus,
textarea:focus {
  background-color: #b1f3e0;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>