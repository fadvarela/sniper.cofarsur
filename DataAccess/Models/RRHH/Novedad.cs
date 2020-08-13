using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccess.Models.RRHH
{
	public class Novedad : Nomina
	{

		[Column("ID_JORNADA")]
		public long IdJornada { get; set; }

		[Column("N_JORNADA")]
		public string Njornada { get; set; }

		[Column("ID_INCIDENCIA")]
		public long IdIncidencia { get; set; }

		[Column("N_INCIDENCIA")]
		public string Nincidencia { get; set; }

		[Column("MARCACIONES")]
		public string Marcaciones { get; set; }

		[Column("H_TEORICAS")]
		public decimal Hteoricas { get; set; }

		[Column("H_TRABAJADAS")]
		public decimal Htrabajadas { get; set; }

		[Column("I_IMPARES")]
		public long Iimpares { get; set; }

		[Column("I_SIN_INCIDENCIAS")]
		public long IsinIncidencias { get; set; }

		[Column("H_ADICIONALES")]
		public decimal Hadicionales { get; set; }

		[Column("H_AUSENCIA")]
		public decimal Hausencia { get; set; }

		[Column("OBSERVACIONES")]
		public string Observaciones { get; set; }

		[Column("LLEGADA_TARDE")]
		public long LlegadaTarde { get; set; }

		[Column("RETIRO_ANTICIPADO")]
		public long RetiroAnticipado { get; set; }
	}
}
