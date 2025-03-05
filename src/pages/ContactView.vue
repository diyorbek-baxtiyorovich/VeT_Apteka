<template>
  <div>
    <div class="contact-us">
      <div class="flex justify-between items-center">
        <div class="contact-text">
          <h1>Contact Us</h1>
          <p>
            Your order will be delivered as per the 'Estimated Delivery Date'
            committed at the time of order placement. You can check this by
            selecting your order from the "My Orders" section. Keep a lookout
            for our order delivery updates.
          </p>
        </div>
      </div>
    </div>
    <div class="contact-form">
      <ContactUsItemForm />
    </div>
    <footer>
      <HomeItemFooter />
    </footer>
  </div>
</template>

<script setup>
import ContactUsItemForm from "@/components/ui/ContactUsItemForm.vue";
import HomeItemFooter from "@/components/common/HomeItemFooter.vue";
</script>

<style scoped>
.contact-us {
  width: 100%;
  padding: 80px 20px;
  background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs5Tst_Yo3KGn9JOSkO1tVAIqLZJ3uAfSXgw&s");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.contact-text {
  width: 50%;
  padding: 0 50px;
}
.contact-text h1 {
  font-size: 40px;
  margin-bottom: 20px;
  color: #fff;
  font-weight: bold;
}
.contact-text p {
  font-size: 18px;
  color: #eae5e5;
}
</style>
