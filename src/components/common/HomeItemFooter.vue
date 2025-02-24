<template>
  <footer class="bg-gray-100 py-10">
    <div class="container mx-auto px-6">
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
      >
        <div>
          <h3 class="text-lg font-semibold">Company</h3>
          <ul class="mt-2 space-y-1 text-gray-600">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Products</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold">Contact Us</h3>
          <ul class="mt-2 space-y-1 text-gray-600">
            <li>+998 91 234 56 78</li>
            <li>
              <a href="mailto:info@mobetco.com" class="hover:underline"
                >info@mobetco.com</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold">Address</h3>
          <p class="mt-2 text-gray-600">
            Tashkent, Yunusabad, Amir Temur, 107B
          </p>
        </div>
      </div>

      <div class="mt-10">
        <iframe
          class="w-full h-64 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.7470245990155!2d69.2869443154225!3d41.32328847926988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8ba1c0c0f34d%3A0x3df4dfd16b3a9e85!2sAmir%20Temur%20Street%2C%20Tashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1617981592973!5m2!1sen!2s"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style scoped></style>
