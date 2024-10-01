export interface EstadisticasDTO {
    "totalTrabajos": number,
	"totalPendientes": number,
	"totalCompletados": number,
	"totalCobrados": number,
	"totalPagados": number,
	"totalIngreso": number,
	"totalManoObra": number,
	"totalRepuestos": number,
	"totalSueldos": number,
	"gananciaNeta": number,
	"totalACobrar": {
		"totalACobrar": string
	},
	"topTareas": [{"nombre" : string, "cantidad": number}],
	"trabajosPorEmpleado": [{"nombre" : string, "cantidad": number,"ingreso": number}],

}