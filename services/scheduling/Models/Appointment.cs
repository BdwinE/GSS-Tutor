using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace scheduling.models
{

    public class Appointment
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime dateTime { get; set; }

        public AppointmentClient RequestorClient { get; set; }

        public AppointmentClient RequesteeClient { get; set; }

        public SubjectMatter RequestedDiscipline { get; set; }

    }

}