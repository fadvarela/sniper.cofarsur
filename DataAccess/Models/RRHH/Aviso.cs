using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Aviso: Novedad
	{
		public long Dias { get; set; }
		public long IdAviso { get; set; }
		public long IdEstado { get; set; }
		public long IdPatologia { get; set; }
		public DateTime FechaDesde { get; set; }
	}
}
