using Core.Common;

namespace Core.Entities
{
    public class PatientImageStore:BaseEntity
    {
        public int PatientId { get; set; }
        public string URL { get; set; }
        public Patient Patient { get; set; }
    }
}