using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class Nomina
	{
		[Column("ID_LEGAJO")]
		public long IdLegajo { get; set; }

		[Column("APELLIDO")]
		public string Apellido { get; set; }

		[Column("NOMBRE")]
		public string Nombre { get; set; }

		[Column("F_NACIMIENTO")]
		public DateTime FechaNacimiento { get; set; }

		[Column("CUIL")]
		public long Cuil { get; set; }

		[Column("DNI")]
		public long Dni { get; set; }

		[Column("F_INGRESO")]
		public DateTime FechaIngreso { get; set; }

		[Column("F_EGRESO")]
		public DateTime? FechaEgreso { get; set; }

		[Column("SECCION")]
		public string Seccion { get; set; }

		[Column("ANTIGUEDAD_STR")]
		public string AntiguedadStr { get; set; }

		[Column("ANTIGUEDAD")]
		public long Antiguedad { get; set; }

		[Column("EDAD")]
		public long Edad { get; set; }
	}
}
