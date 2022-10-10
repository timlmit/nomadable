import { Event } from "../../redux/slices/eventSlice";

export const addNewEvent = async (mongoose: any, eventItem: Event) => {
  console.log(
    "🚀 ~ file: addNewEvent.ts ~ line 4 ~ addNewEvent ~ eventItem",
    eventItem
  );
  const Event = mongoose.model("Event");
  await Event.create(eventItem);
  return;
};
