using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccess.Models.RRHH
{
	public class JornadaHabitual: Nomina
	{
		[Column("SECCION")]
		public string Seccion { get; set; }

		[Column("ID_JORNADA_LUNES")]
		public long IdJlunes { get; set; }

		[Column("N_JORNADA_LUNES")]
		public string NjLunes { get; set; }

		[Column("ID_JORNADA_MARTES")]
		public long IdJmartes { get; set; }

		[Column("N_JORNADA_MARTES")]
		public string NjMartes { get; set; }

		[Column("ID_JORNADA_MIERCOLES")]
		public long IdJmiercoles { get; set; }

		[Column("N_JORNADA_MIERCOLES")]
		public string NjMiercoles { get; set; }

		[Column("ID_JORNADA_JUEVES")]
		public long IdJjueves { get; set; }

		[Column("N_JORNADA_JUEVES")]
		public string NjJueves { get; set; }

		[Column("ID_JORNADA_VIERNES")]
		public long IdJviernes { get; set; }

		[Column("N_JORNADA_VIERNES")]
		public string NjViernes { get; set; }

		[Column("ID_JORNADA_SABADO")]
		public long IdJsabado { get; set; }

		[Column("N_JORNADA_SABADO")]
		public string NjSabado { get; set; }

		[Column("ID_JORNADA_DOMINGO")]
		public long IdJdomingo { get; set; }

		[Column("N_JORNADA_DOMINGO")]
		public string NjDomingo { get; set; }

		[Column("HS_SEMANALES")]
		public decimal HsSemanales { get; set; }
	}
}
