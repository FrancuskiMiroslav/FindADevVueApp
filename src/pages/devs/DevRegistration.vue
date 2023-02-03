<template>
    <section>
      <base-card>
        <h2>Register as a DEV now!</h2>
        <form @submit.prevent="submitForm" action="">
            <div class="form-control">
                <label for="firstname">Firstname</label>
                <input type="text" id="firstname" v-model.trim="firstName">
            </div>
            <div class="form-control">
                <label for="lastname">Lastname</label>
                <input type="text" id="lastname" v-model.trim="lastName">
            </div>
            <div class="form-control">
                <label for="description">Description</label>
                <textarea type="text" id="description" rows="5" v-model.trim="description"></textarea>
            </div>
            <div class="form-control">
                <label for="rate">Hourly Rate</label>
                <input type="number" id="rate" v-model.number="rate">
            </div>

            <div class="form-control">
                <h3>Areas of Expertise</h3>
                <div>
                    <input type="checkbox" id="frontend" value="frontend" v-model="areas">
                    <label for="frontend">Frontend developer</label>
                </div>
                <div>
                    <input type="checkbox" id="backend" value="backend" v-model="areas">
                    <label for="backend">Backend developer</label>
                </div>
                <div>
                    <input type="checkbox" id="fullstack" value="fullstack" v-model="areas">
                    <label for="fullstack">Full-stack developer</label>
                </div>
            </div>
            <base-button class="button">Register</base-button>
        </form>
      </base-card>
    </section>
</template>

<script>
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            description: '',
            rate: null,
            areas: [],
        }
    },
    methods: {
      submitForm() {
        const formData = {
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          rate: this.rate,
          areas: this.areas
        };

        console.log(formData)
      }
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