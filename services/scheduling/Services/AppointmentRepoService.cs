using scheduling.models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Options;

namespace scheduling.services
{
    public class AppointmentRepoService
    {

        private readonly IMongoCollection<Appointment> _appointments;
        private readonly ServiceSettings _settings;

        public AppointmentRepoService(IOptions<ServiceSettings> settings)
        {
            _settings = settings.Value;
            var client = new MongoClient(_settings.DbConnectionString);
            var database = client.GetDatabase(_settings.DatabaseName);

            _appointments = database.GetCollection<Appointment>("Appointments");
        }

        public List<Appointment> Get() =>
            _appointments.Find(appt => true).ToList();

        public Appointment Get(string id) =>
            _appointments.Find<Appointment>(appt => appt.Id == id).FirstOrDefault();

        public Appointment Create(Appointment appointment)
        {
            _appointments.InsertOne(appointment);
            return appointment;
        }

        public List<Appointment> Find(FilterDefinition<Appointment> filter)
        {
            return _appointments.Find<Appointment>(filter).ToList();
        }

        public void Update(string id, Appointment appointment) =>
            _appointments.ReplaceOne(appt => appt.Id == id, appointment);

        public void Remove(Appointment appointment) =>
            _appointments.DeleteOne(appt => appt.Id == appointment.Id);

        public void Remove(string id) =>
            _appointments.DeleteOne(appt => appt.Id == id);
    }
}