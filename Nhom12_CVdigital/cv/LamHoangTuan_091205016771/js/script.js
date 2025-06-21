document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  section.classList.add('hidden'); // Đảm bảo các section bắt đầu với class hidden
  observer.observe(section);
});

AOS.init({
  duration: 1000, 
  once: true     
});


const skillSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                const percent = bar.getAttribute('data-percent');
                if (percent) {
                    bar.style.width = percent + '%';

                    // Thêm span hiển thị phần trăm
                    const span = document.createElement('span');
                    span.textContent = percent + '%';
                    bar.appendChild(span);
                }
            });
            observer.unobserve(entry.target); 
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.5 
});

if (skillSection) { 
    skillObserver.observe(skillSection);
}