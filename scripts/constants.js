export { config, initialCards };

const initialCards = [
    {
      name: "Куршская коса",
      link: "https://images.unsplash.com/photo-1665916143119-980b833323d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTAwNXwwfDF8c2VhcmNofDF8fGN1cm9uaWFuLXNwaXR8ZW58MHx8fHwxNjgxMTM4ODEz&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      name: "Дом Советов",
      link: "https://images.unsplash.com/photo-1636137531695-6b2677da85f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTAwNXwwfDF8c2VhcmNofDM5fHxrYWxpbmluZ3JhZHxlbnwwfHx8fDE2ODExMzg5MjM&ixlib=rb-4.0.3&q=80&w=400",
    },
    {
      name: "Светлогорск",
      link: "https://images.unsplash.com/photo-1630735978992-e4881d957c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTAwNXwwfDF8c2VhcmNofDQ0fHxzdmV0bG9nb3Jza3xlbnwwfHx8fDE2ODExMzkwMzY&ixlib=rb-4.0.3&q=80&w=400",
    },
    {
      name: "Краснолеьсе",
      link: "http://kaliningrad-city24.ru/wp-content/uploads/2018/08/most.jpg",
    },
    {
      name: "Кафедральный собор",
      link: "https://images.unsplash.com/photo-1652288870682-074a41af248a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTAwNXwwfDF8c2VhcmNofDEwN3x8a2FsaW5pbmdyYWR8ZW58MHx8fHwxNjgxMTM4OTY2&ixlib=rb-4.0.3&q=80&w=400",
    },
    {
      name: "Зеленоградск",
      link: "https://images.unsplash.com/photo-1641926584329-e12487107a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTAwNXwwfDF8c2VhcmNofDY1fHx6ZWxlbm9ncmFkc2t8ZW58MHx8fHwxNjgxMTM5MTYw&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ];

  const config = {
    inputElement: ".popup__input",
    inputErrorClass: ".popup__input-error_type_",
    errorClass: "popup__input-error",
    inputVisibleError: "popup__input_visible-error",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
  };