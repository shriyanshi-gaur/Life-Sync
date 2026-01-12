export function getChartOptions() {
  return {
    plugins: {
      legend: {
        labels: { color: '#fff', font: { size: 12 } }
      }
    },
    scales: {
      x: { ticks:{ color:'#aaa' }, grid:{ color:'rgba(255,255,255,0.05)' } },
      y: { ticks:{ color:'#aaa' }, grid:{ color:'rgba(255,255,255,0.05)' } },
    }
  }
}
