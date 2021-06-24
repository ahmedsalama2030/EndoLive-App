using System;

namespace Core.Common
{
    public  class Person:BaseEntity
    {
         public string FirstName { get; set; }
         public string SecondName { get; set; }
        public string ThirdName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string NationalId { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
         public string GetName()
        {
            return $"{this.FirstName} {this.SecondName} {this.ThirdName} {this.LastName}";
        }
 
    }
}