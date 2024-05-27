using PillsTracking.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PillsTracking.DataObjects
{
    public class PrescriptionToUpdateDTO
    {
        public Guid PatientId { get; set; }
        public Guid PrescriptionID { get; set; }
        public int Duration { get; set; }
        public List<Drug> Drugs { get; set; }
    }
}
