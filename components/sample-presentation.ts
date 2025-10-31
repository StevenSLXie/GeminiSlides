// Fix: Removed invalid file marker syntax that was causing compilation errors.
export const sample = {
  prompt: `
  **报告：人工智能的快速增长及其影响**

  **引言：**
  人工智能已不再是未来的概念，而是正在重塑当今产业的变革力量。本报告分析了人工智能的现状，重点关注其爆炸性的市场增长、关键性能指标以及驱动其发展的基本流程。

  **市场分析：**
  全球人工智能市场正在经历前所未有的增长。2022年，其估值约为1360亿美元，预计到2027年将飙升至超过8690亿美元。这种指数级增长得益于医疗、金融和娱乐等行业的广泛采用。惊人的复合年增长率反映了巨大的投资者信心和技术进步。我们的分析显示，市场规模逐年增加，从2023年的1960亿美元，2024年的2840亿美元，2025年的4120亿美元，2026年的5970亿美元，最终在2027年达到近万亿美元的估值。

  **关键性能指标：**
  几个关键指标说明了人工智能进步的规模。先进的大型语言模型现在可以处理多达8.3万亿个参数，使其在理解和生成方面的复杂性和精细度达到了新的水平。在图像识别和语言翻译等特定任务的基准测试中，顶级模型的准确率持续达到97%。这种高可靠性是其在关键应用中被采用的主要因素。此外，主要人工智能服务的日活跃用户数已超过3亿，表明人工智能正迅速融入消费者和专业人士的日常生活中。

  **开发生命周期：**
  人工智能开发过程可以简化为三个核心阶段。首先是**数据**，即收集、清洗和准备海量数据集。这是构建模型的基础。第二阶段是**训练**，这是一个计算密集型过程，模型从中学习数据的模式、关系和结构。最后阶段是**部署**，将训练好的模型集成到应用程序和服务中，使其智能可供最终用户使用。随着从部署的模型中收集新数据以改进未来迭代，这个周期性过程不断得到完善。
  `,
  html: `
<section class="slide flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-8">
  <h1 class="text-6xl font-bold mb-4 animate-fade-in-down">人工智能的崛起</h1>
  <p class="text-2xl text-gray-300 animate-fade-in-up">探索智能的未来</p>
</section>

<section class="slide flex flex-col items-center justify-center h-screen bg-gray-800 text-white p-8">
  <h2 class="text-4xl font-bold mb-8">AI市场增长</h2>
  <div class="w-full max-w-4xl h-96">
    <canvas data-component="chart" data-chart='{
      "type": "bar",
      "data": {
        "labels": ["2022年", "2023年", "2024年", "2025年", "2026年", "2027年"],
        "datasets": [{
          "label": "市场规模（十亿美元）",
          "data": [136, 196, 284, 412, 597, 869],
          "backgroundColor": "rgba(168, 85, 247, 0.6)",
          "borderColor": "rgba(168, 85, 247, 1)",
          "borderWidth": 1
        }]
      },
      "options": {
        "responsive": true,
        "maintainAspectRatio": false,
        "scales": { "y": { "beginAtZero": true } }
      }
    }'></canvas>
  </div>
</section>

<section class="slide flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
    <h2 class="text-4xl font-bold mb-8">关键指标</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
            <h3 class="text-6xl font-bold count-up" data-value="8.3">0</h3>
            <p class="text-xl text-gray-400 mt-2">万亿参数</p>
        </div>
        <div>
            <h3 class="text-6xl font-bold count-up" data-value="97">0</h3>
            <p class="text-xl text-gray-400 mt-2">% 准确率</p>
        </div>
        <div>
            <h3 class="text-6xl font-bold count-up" data-value="300">0</h3>
            <p class="text-xl text-gray-400 mt-2">百万日活用户</p>
        </div>
    </div>
</section>

<section class="slide flex flex-col items-center justify-center h-screen bg-gray-800 text-white p-8">
  <h2 class="text-4xl font-bold mb-8">AI开发流程</h2>
  <svg id="process-diagram" width="600" height="200" viewBox="0 0 600 200">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#a78bfa" />
      </marker>
    </defs>
    <!-- Lines -->
    <path class="diagram-path" d="M 100 100 L 250 100" stroke="#a78bfa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
    <path class="diagram-path" d="M 350 100 L 500 100" stroke="#a78bfa" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
    <!-- Circles and Text -->
    <g class="diagram-step opacity-0">
      <circle cx="50" cy="100" r="40" fill="#4b5563"/>
      <text x="50" y="105" font-family="sans-serif" font-size="14" fill="white" text-anchor="middle">数据</text>
    </g>
    <g class="diagram-step opacity-0">
      <circle cx="300" cy="100" r="40" fill="#4b5563"/>
      <text x="300" y="105" font-family="sans-serif" font-size="14" fill="white" text-anchor="middle">训练</text>
    </g>
    <g class="diagram-step opacity-0">
      <circle cx="550" cy="100" r="40" fill="#4b5563"/>
      <text x="550" y="105" font-family="sans-serif" font-size="14" fill="white" text-anchor="middle">部署</text>
    </g>
  </svg>
</section>

<section class="slide flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-8">
  <h2 class="text-4xl font-bold mb-4">谢谢</h2>
  <p class="text-xl">有任何问题吗？</p>
</section>
`,
  css: `
.slide {
  width: 100%;
  height: 100vh; /* vh ensures it takes full viewport height */
  scroll-snap-align: start;
  scroll-snap-stop: always;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.slide.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Ensure body and html are full height for snapping */
html, body {
  height: 100%;
  margin: 0;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  background-color: #111827; /* gray-900 */
}


/* Initial State for Animations */
.diagram-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}


/* Simple Animations */
@keyframes fade-in-down {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fade-in-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
}

.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out 0.4s forwards;
    opacity: 0;
}
`,
  js: `
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' class to slide for fade-in effect
                entry.target.classList.add('is-visible');

                // Animate elements within the slide
                const chartCanvas = entry.target.querySelector('[data-component="chart"]');
                const countUpElements = entry.target.querySelectorAll('.count-up');
                const processDiagram = entry.target.querySelector('#process-diagram');

                if (chartCanvas) {
                    const chartDataString = chartCanvas.dataset.chart;
                    
                    // Always destroy the previous chart instance before creating a new one
                    if (chartCanvas.chartInstance) {
                        chartCanvas.chartInstance.destroy();
                    }

                    if (chartDataString) {
                        try {
                            const chartData = JSON.parse(chartDataString);
                            // Store the new chart instance on the canvas element
                            chartCanvas.chartInstance = new Chart(chartCanvas.getContext('2d'), chartData);
                        } catch (e) {
                            console.error('Failed to parse chart data or create chart:', e);
                        }
                    } else {
                         console.error('Chart canvas is missing data-chart attribute or it is empty.');
                    }
                }

                if (countUpElements.length > 0) {
                    countUpElements.forEach(el => {
                        if (el.dataset.animated) return;
                        el.dataset.animated = true;
                        anime({
                            targets: el,
                            innerHTML: [0, el.dataset.value],
                            round: el.dataset.value % 1 === 0 ? 1 : 100, // Round to integer or 2 decimal places
                            easing: 'easeOutExpo',
                            duration: 2000
                        });
                    });
                }
                
                if (processDiagram && !processDiagram.dataset.animated) {
                    processDiagram.dataset.animated = true;
                    const tl = anime.timeline({
                        easing: 'easeOutExpo',
                        duration: 1000
                    });
                    tl.add({
                        targets: '.diagram-path',
                        strokeDashoffset: [anime.setDashoffset, 0],
                    }).add({
                        targets: '.diagram-step',
                        opacity: [0, 1],
                        duration: 500,
                        delay: anime.stagger(200)
                    }, '-=500');
                }

                // Optional: unobserve the element after it has been animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all slides
    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });
});
`,
};