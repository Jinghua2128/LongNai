// Import jQuery
$(document).ready(() => {
  const apiKey = "677f2236306a940f5e829b81"
  const dbUrl = "https://interactivedev-7676.restdb.io/rest/"

  let currentUser = null
  let currentStory = null

  // Page navigation
  function showPage(pageId) {
    $(".page").addClass("hidden")
    $(`#${pageId}`).removeClass("hidden")
  }

  // Login functionality
  $("#login-form").submit((e) => {
    e.preventDefault()
    const username = $("#username").val()
    const password = $("#password").val()

    $.ajax({
      url: `${dbUrl}users`,
      method: "GET",
      headers: {
        "x-apikey": apiKey,
      },
      data: {
        q: JSON.stringify({ username: username, password: password }),
      },
      success: (data) => {
        if (data.length > 0) {
          currentUser = data[0]
          $("#user-name").text(currentUser.username)
          showPage("home-page")
        } else {
          alert("Invalid username or password")
        }
      },
      error: () => {
        alert("An error occurred. Please try again.")
      },
    })
  })

  // Sign up functionality
  $("#signup-form").submit((e) => {
    e.preventDefault()
    const newUser = {
      username: $("#new-username").val(),
      email: $("#email").val(),
      password: $("#new-password").val(),
      grade: $("#grade").val(),
    }

    $.ajax({
      url: `${dbUrl}users`,
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(newUser),
      success: () => {
        alert("Sign up successful! Please log in.")
        showPage("login-page")
      },
      error: () => {
        alert("An error occurred. Please try again.")
      },
    })
  })

  // Forgot password functionality
  $("#forgot-password-form").submit((e) => {
    e.preventDefault()
    // Implement password reset logic here
    alert("Password reset functionality not implemented in this demo.")
  })

  // Play button click
  $("#play-button").click(() => {
    showPage("play-page")
  })

  // Story selection
  $(".story-box").click(function () {
    const storyId = $(this).data("story")
    loadStory(storyId)
  })

  function loadStory(storyId) {
    $.ajax({
      url: `${dbUrl}stories/${storyId}`,
      method: "GET",
      headers: {
        "x-apikey": apiKey,
      },
      success: (data) => {
        currentStory = data
        $("#story-title").text(data.title)
        $("#story-content").html(data.content)
        showPage("game-page")
        load3DModel(data.characterModel)
      },
      error: () => {
        alert("An error occurred while loading the story. Please try again.")
      },
    })
  }

  function load3DModel(modelUrl) {
    // Implement Three.js model loading here
    // This is a placeholder function
    console.log("Loading 3D model:", modelUrl)
  }

  // Navigation links
  $("#signup-link").click(() => {
    showPage("signup-page")
  })

  $("#forgot-password-link").click(() => {
    showPage("forgot-password-page")
  })
})

