<template>
  <div class="contact-form">
    <form action="#" class="flex flex-col gap-4">
      <input type="text" placeholder="Your Name" />
      <input type="email" placeholder="Your Email" />
      <input type="text" placeholder="Subject" />
      <textarea
        name=""
        id=""
        cols="60"
        rows="10"
        placeholder="Your Message"
      ></textarea>
      <button>Send Message</button>
    </form>
  </div>
</template>

<style scoped>
.contact-form {
  width: 100%;
  padding: 80px 20px;
  background-color: #f8f8f8;
}

.contact-form form {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.contact-form form input,
.contact-form form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.contact-form form textarea {
  height: 150px;
}

.contact-form form button {
  width: 100%;
  padding: 10px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.contact-form form button:hover {
  background-color: #ff3333;
}

.contact-form form button:active {
  background-color: #ff1a1a;
}
</style>
