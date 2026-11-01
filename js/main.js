// js/main.js

// 등록 방법 탭 전환 기능
const regTabBtns = document.querySelectorAll('.reg-tab-btn');
const regContents = document.querySelectorAll('.reg-content');

regTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');

        // 모든 버튼 스타일 초기화 (비활성 상태로)
        regTabBtns.forEach(b => {
            b.classList.remove('bg-[#6a0607]', 'text-white', 'shadow-sm');
            b.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
        });

        // 클릭한 버튼만 활성 상태(로즈 레드)로 변경
        btn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
        btn.classList.add('bg-[#6a0607]', 'text-white', 'shadow-sm');

        // 해당 컨텐츠만 보여주고 나머지는 숨김
        regContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// 타임테이블 데이터 구조 정의
const timetableData = {
    day1: [
        { time: "12:00", title: "등록", desc: "사전등록 확인 및 현장등록" },
        { time: "13:00", title: "개회 예배", desc: "포항중앙침례교회 김중식 목사" },
        { time: "14:00", title: "오리엔테이션", desc: "광고 및 주의사항 안내" },
        { time: "14:30", title: "Concert", desc: "제이어스 현지혜 간사" },
        { time: "16:30", title: "Special: 크리스천의 결혼과 연애", desc: "정상미 사모" },
        { time: "17:30", title: "저녁식사", desc: "" },
        { time: "19:00", title: "Session 1", desc: "Holy United, 제이어스 김준영 대표" }
    ],
    day2: [
        { time: "10:00", title: "Session 2", desc: "Holy United, 한동대 노규석 목사" },
        { time: "12:30", title: "점심식사", desc: "" },
        { time: "13:30", title: "Concert", desc: "Mentor Crew" },
        { time: "15:30", title: "소그룹 모임", desc: "" },
        { time: "16:30", title: "Special", desc: "포항동부교회 김영걸 목사" },
        { time: "17:30", title: "저녁식사", desc: "" },
        { time: "19:00", title: "Session 3", desc: "아가파오, 김무열 목사" }
    ],
    day3: [
        { time: "10:00", title: "Session 4", desc: "Holy United, 넘치는교회 이창호 목사" },
        { time: "12:30", title: "점심식사", desc: "" },
        { time: "13:30", title: "Session 5", desc: "Holy United, 빌라델비아교회 정이호 목사" },
        { time: "16:30", title: "Special", desc: "한동대 박성진 총장" },
        { time: "17:30", title: "저녁식사", desc: "" },
        { time: "19:00", title: "Session 6", desc: "아가파오, 김무열 목사" }
    ]
};

// 날짜별 참가비 및 안내 문구 자동 렌더링 함수
function renderDynamicFee() {
    const feeTextElement = document.getElementById('feeText');
    const feeBadgeElement = document.getElementById('feeBadge');

    if (!feeTextElement) return;
    const now = new Date();

    const firstEnd = new Date('2027-01-04T23:59:59'); // 1월 4일까지
    const secondEnd = new Date('2027-01-11T23:59:59');   // 1월 11일까지
    const lastEnd = new Date('2027-01-18T23:59:59');   // 1월 18일까지
    const badge1 = document.getElementById('feeBadge1');
    const badge2 = document.getElementById('feeBadge2');
    const badge3 = document.getElementById('feeBadge3');

    if (now <= firstEnd) {
        // 1차 사전등록 7만원
        feeTextElement.innerHTML = `1인 <span class="text-amber-600 font-bold">70,000원</span> <span class="text-xs text-slate-400 line-through">(정가 90,000원)</span>`;
        badge1.innerText = "🔥 1차 사전등록 기간 (~1/4)";
        badge1.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700";
        badge2.innerText = "숙박 미포함";
        badge2.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-400";
        badge3.innerText = "중식,석식 제공";
        badge3.className = "px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600";

    } else if (now <= secondEnd) {
        // 2차 사전등록 7만5천원
        feeTextElement.innerHTML = `1인 <span class="text-slate-900 font-bold">75,000원</span>`;
        if (feeBadgeElement) {
            feeBadgeElement.innerText = "🔥 2차 사전등록 기간 (~1/11)";
            feeBadgeElement.className = "inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700";
        }
    } else if (now <= lastEnd) {
        // 3차 사전등록 8만원
        feeTextElement.innerHTML = `1인 <span class="text-slate-900 font-bold">80,000원</span>`;
        if (feeBadgeElement) {
            feeBadgeElement.innerText = "🔥 3차 사전등록 기간 (~1/18)";
            feeBadgeElement.className = "inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700";
        }
    } else {
        // 3단계: 마감 및 현장 등록 기간
        feeTextElement.innerHTML = `1인 <span class="text-rose-600 font-bold">90,000원 (일일등록: 50,000원)</span>`;
        if (feeBadgeElement) {
            feeBadgeElement.innerText = "⚠️ 사전접수가 마감되었습니다";
            feeBadgeElement.className = "inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700";
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    renderDynamicFee();
    // 1. Lucide 아이콘 초기화
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. 타임테이블 렌더링 함수 실행
    Object.keys(timetableData).forEach(dayKey => {
        const container = document.getElementById(dayKey);
        if (!container) return;

        let html = '';
        timetableData[dayKey].forEach(item => {
            html += `
                <div class="flex items-start gap-3 p-2.5 bg-slate-50 border border-slate-100">
                    <span class="text-xs font-bold text-[#6a0607] bg-[#ffffff] px-2 py-0.5  shrink-0">${item.time}</span>
                    <div>
                        <p class="text-xs font-bold text-slate-800">${item.title}</p>
                        ${item.desc ? `<p class="text-[11px] text-slate-500">${item.desc}</p>` : ''}
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    });

    // 3. 계좌 복사 기능
    const bankAccount = "3333-01-2345678";
    function copyAccount() {
        navigator.clipboard.writeText(bankAccount).then(() => {
            showToast("계좌번호가 클립보드에 복사되었습니다!");
        }).catch(() => {
            showToast("계좌번호 복사에 실패했습니다.");
        });
    }

    const copyBankBtn = document.getElementById('copyBankBtn');
    const quickCopyBtn = document.getElementById('quickCopyBtn');
    if (copyBankBtn) copyBankBtn.addEventListener('click', copyAccount);
    if (quickCopyBtn) quickCopyBtn.addEventListener('click', copyAccount);

    function showToast(message) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        if (toast && toastMsg) {
            toastMsg.innerText = message;
            toast.classList.remove('opacity-0');
            toast.classList.add('opacity-100');
            setTimeout(() => {
                toast.classList.remove('opacity-100');
                toast.classList.add('opacity-0');
            }, 2500);
        }
    }


    // 5. 프로그램 타임테이블 탭 전환
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                if (content.id === targetDay) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });

    // 6. FAQ 아코디언 토글
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const answer = toggle.nextElementSibling;
            const icon = toggle.querySelector('[data-lucide="chevron-down"]');

            answer.classList.toggle('hidden');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });

    // 1. 신청서 폼 탭 전환 기능 (개인 vs 단체)
    const formTabBtns = document.querySelectorAll('.form-tab-btn');
    const formContents = document.querySelectorAll('.form-content');

    formTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // 버튼 스타일 초기화 (비활성화)
            formTabBtns.forEach(b => {
                b.classList.remove('bg-[#6a0607]', 'text-white', 'shadow-sm');
                b.classList.add('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            });

            // 클릭된 버튼 활성화
            btn.classList.remove('bg-slate-100', 'text-slate-600', 'hover:bg-slate-200');
            btn.classList.add('bg-[#6a0607]', 'text-white', 'shadow-sm');

            // 해당 폼 출력
            formContents.forEach(form => {
                if (form.id === targetId) {
                    form.classList.remove('hidden');
                } else {
                    form.classList.add('hidden');
                }
            });
        });
    });

    // 2. 모든 전화번호 입력창 자동 하이픈 서식 처리 (.phone-input)
    document.querySelectorAll('.phone-input').forEach(input => {
        input.addEventListener('input', function (e) {
            let val = e.target.value.replace(/[^0-9]/g, '');
            let formatted = '';
            if (val.length < 4) {
                formatted = val;
            } else if (val.length < 8) {
                formatted = val.substring(0, 3) + '-' + val.substring(3);
            } else {
                formatted = val.substring(0, 3) + '-' + val.substring(3, 7) + '-' + val.substring(7, 11);
            }
            e.target.value = formatted;
        });
    });

    // 3. 개인/단체 폼 각각의 Submit 제출 이벤트
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';

    // 개인 폼 제출
    const individualForm = document.getElementById('individualForm');
    if (individualForm) {
        individualForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                type: '개인',
                name: document.getElementById('name').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                group: document.getElementById('group').value.trim(),
                gender: document.getElementById('gender').value,
                depositor: document.getElementById('depositor').value.trim(),
                memo: document.getElementById('memo').value.trim()
            };
            handleFormSubmit(individualForm, formData, 'submitIndividualBtn');
        });
    }

    // 단체 폼 제출
    const groupForm = document.getElementById('groupForm');
    if (groupForm) {
        groupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                type: '단체',
                groupOrgName: document.getElementById('groupOrgName').value.trim(),
                groupLeaderName: document.getElementById('groupLeaderName').value.trim(),
                groupCount: document.getElementById('groupCount').value,
                groupLeaderPhone: document.getElementById('groupLeaderPhone').value.trim(),
                groupDepositor: document.getElementById('groupDepositor').value.trim(),
                groupMemo: document.getElementById('groupMemo').value.trim()
            };
            handleFormSubmit(groupForm, formData, 'submitGroupBtn');
        });
    }

    // 공통 전송 함수
    function handleFormSubmit(formElement, formData, btnId) {
        const btn = document.getElementById(btnId);
        btn.disabled = true;
        btn.innerHTML = `접수 중입니다...`;

        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
            setTimeout(() => {
                alert(`[테스트 접수 완료]\n유형: ${formData.type}\n신청 완료되었습니다.`);
                formElement.reset();
                btn.disabled = false;
                btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> ${formData.type} 참가 신청하기`;
                lucide.createIcons();
            }, 1000);
            return;
        }

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(() => {
            alert(`${formData.type} 참가 신청이 완료되었습니다!`);
            formElement.reset();
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> ${formData.type} 참가 신청하기`;
            lucide.createIcons();
        }).catch(err => {
            console.error(err);
            alert('신청 중 오류가 발생했습니다.');
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> ${formData.type} 참가 신청하기`;
            lucide.createIcons();
        });
    }
});
