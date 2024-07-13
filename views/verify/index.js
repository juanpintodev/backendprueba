(async () => {
  try {
    const token = window.location.pathname.split("/")[2];
    const id = window.location.pathname.split("/")[1];
    console.log(id);
    const { data } = await axios.patch(`/api/users/${id}/${token}`);
  } catch (error) {
    console.log(error.response.data.error);
  }
})();
