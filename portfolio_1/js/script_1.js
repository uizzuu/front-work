// 페이지 로드 후 DOM이 준비되면 실행될 함수
document.addEventListener('DOMContentLoaded', () => {
    // 섹션 요소들을 모두 가져옵니다.
    const sections = document.querySelectorAll('.sec');

    // IntersectionObserver를 생성합니다.
    // 이 객체는 요소가 뷰포트 내에 들어오는지 여부를 감지합니다.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // entry.isIntersecting이 true이면 요소가 뷰포트에 들어온 것입니다.
            if (entry.isIntersecting) {
                // 'is-visible' 클래스를 추가하여 애니메이션을 활성화합니다.
                entry.target.classList.add('is-visible');
                // 한 번 애니메이션이 실행된 후에는 더 이상 감지할 필요가 없으므로 관찰을 중단합니다.
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 옵션 설정: 뷰포트의 10%가 보이면 콜백 함수를 실행합니다.
        threshold: 0.1
    });

    // 각 섹션에 대해 관찰을 시작합니다.
    sections.forEach(section => {
        observer.observe(section);
    });

    // 부드러운 스크롤 기능을 추가합니다.
    // #으로 시작하는 모든 링크를 선택합니다.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 앵커 동작을 막습니다.

            // href 속성에서 대상 요소의 ID를 가져옵니다.
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // 대상 요소로 부드럽게 스크롤합니다.
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
