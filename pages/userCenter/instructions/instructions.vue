<template>

	<!--<view style="margin-left: auto;margin-right: auto;font-weight: bold;text-align: center;font-size: 1.5rem;">
		[流沙任务系统]使用说明</view>
	<text>\n\n</text>-->

	<image class="swiper-item-image" src="https://liusha-gy.com/flow/static/p1.png">
	</image>

	<view  style="position: relative;margin-left: 10rpx ;">
		<!-- 第一个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(1)">
				系统运行概念
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[1] ? 'v' : '收起' }}</view>
			</view>

			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[1]">
				<text>\n</text>
				<text class="bold">最基本规则阐明：</text><br />
				&#8195;<text>
					注册用户通过发布、完成任务卡的形式获得属于他的既定或后续的劳动报酬。<br /> <text>\n\n</text>
				</text>
				
				<text class="bold">该系统不可替代必须要达成的要素要点：</text><br />
				<text>
					1.用户必须实名注册 <br /> 2.卡片任务必须透明<br />3.审核区间需时刻保持与劳动量挂钩，设置公平合理。<br />
					<text class="beizhu">*当这些要点未被达成时，系统将会偏离设计初衷，甚至荒废。</text>
				</text>
				<text>\n\n\n</text>
				<text class="bold">该系统设计的目的</text><br />
				<text>
					·创造一个能改善现有公司体制，优化工作劳动模式的分配系统。
				</text><br />
				<text>\n\n</text>
				<text class="bold">该系统将带来的意义</text><br />
				<text>
					·实现劳有所得、按劳分配的新时代高质量发展的社会主义制度环境，为接入AGI自动化社会做过渡。
				</text><br />
				<text>\n\n</text>
				
				<text class="bold">平台经营相关</text><br />·平台遵循共同建造、共同使用、共同维护的原则。<br /><text>\n</text>
				<text class="jieshao">
					
					
					平台各项启动费用第一年由开发者承担，过后维持其运行的基本费用由全体注册用户平均分担。但由于分摊计算方式复杂，
					平台运行后将初步采用“收费-扣除消耗-返还剩余” 思路去变相实现平摊。详细计算方法请见:	<view class="lianjie" @click="tocbout" >《成本分摊方略》</view>	
						<br />
				</text><text class="jieshao">·在平台运行良好的情况下，将从每个有长久后续收益的任务中划拨微小的比例，用于平均资助于劳动能力低下（或无劳动能力）的注册用户，以维持其基本生活存续。<text>\n\n</text>
			</text></view>
		</view>

		<!-- 第二个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(2)">
				使用功能介绍
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[2] ? 'v' : '收起' }}</view>
			</view>

			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[2]">
				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(2, 1)">
						首页浏览任务功能
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[2][1] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[2][1]">
						<text class="jieshao">
							&#8195;您进入小程序后可随意浏览“任务卡池”、“发布任务”、“沟通记录”、“个人中心”4个主区域。<br />
						</text>
						<text class="jinggao">*允许未注册用户浏览小程序首页界面，但无法创建、发布、查看任务卡；</text><br />
					</view>
				</view>

				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(2, 2)">
						搜索功能
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[2][2] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[2][2]">
						<text class="jieshao">
							*注册用户可点击搜索框进行关键词搜索
						</text>
<br /><text>\n</text>
						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(2, 2.1)">
								--搜索任务（包括待完成和已完成）
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[2][2.1] ? 'v' : '收起' }}</view>
							</view>

							<!-- 折叠面板 -->
							<view v-if="!isSubPanelCollapsed[2][2.1]">
								<text class="jieshao">
									*在需要查询时某种类型的任务时可进行统一搜索，<br />
									<text class="beizhu">例如：“送餐”、“家教”、“插画”、“修空调” </text></text><text>\n\n</text>
							</view>
						</view>

						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(2, 2.2)">
								--搜索已创立的审核区间
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[2][2.2]? 'v' : '收起' }}</view>
							</view>

							<!-- 折叠面板 -->
							<view v-if="!isSubPanelCollapsed[2][2.2]">
								<text class="jieshao">
									*在需要查询时某种活动项目类型的审核区间时可进行统一搜索，<br />
									<text class="beizhu">例如：“送餐 审核区间”、“app制作 审核区间”、“人物设定插画审核区间”、“修空调 审核区间”</text>
								</text><text>\n\n</text>
							</view>
						</view>






					</view>

					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(2, 3)">
							*创建任务卡功能
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{ isSubPanelCollapsed[2][3] ? 'v' : '收起' }}</view>
						</view>

						<!-- 折叠面板 -->
						<view v-if="!isSubPanelCollapsed[2][3]">
							<text>
							*注册用户可在创建任务卡区域将自己的需求填写发布，需求将以“任务卡”的形式在首页区域向所有用户展示。<br /><br />
								<!-- 主面板 -->
								<view class="user-view2" @click="toggleSubPanel(2, 3.1)">
									--创建单项任务卡
									<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
										{{ isSubPanelCollapsed[2][3.1] ? 'v' : '收起' }}</view>
								</view>
								
								<!-- 折叠面板 -->
								<view v-if="!isSubPanelCollapsed[2][3.1]">
									<text>
										<text class="bold2">单项任务卡指：</text><br />
										一次只能发布数量为"1"张,回馈比为100%的任务卡（ 可创建卡片类型包括：信息、审核、资金、分发、建设、技术 ）
									</text>
									<text class="jieshao">*在创建任务卡区域，选择“单项”选项，选择卡片类型，点击创建。
									注册用户即可以进入创建页面，根据需要填写自己的各种内容。待填写完整后，点击“确认支付劳动回馈”按钮并支付相应金额后。
									任务卡即发布成功，进入首页卡池展示。</text><br /><text>\n</text>
								</view>
								<view>
									<!-- 主面板 -->
									<view class="user-view2" @click="toggleSubPanel(2, 3.2)">
										--创建多项任务卡
										<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
											{{ isSubPanelCollapsed[2][3.2] ? 'v' : '收起' }}</view>
									</view>
								
									<!-- 折叠面板 -->
									<view v-if="!isSubPanelCollapsed[2][3.2]">
										<text>
											<text class="bold2">多项任务卡指：</text><br />一次发布任务卡数量不限且所有制作卡总回馈比相加之和为100%（
											卡片类型包括：制作、审核、资金、分发） </text><br />
										<text class="jieshao">*在创建任务卡区域，选择“多项”选项，点击创建。注册用户即可以进入创建页面，依次填写审核卡、制作卡、资金卡、分发卡
										</text>
										<text class="jinggao">注意！制作卡可以多次添加，并且每个分项所设定的回馈比需要准确对应相关审核区间。如若当前需求项目领域还没有审核区间，可以先去创建一个。用以填充整个所需项目的流程。</text><text>\n\n\n</text>
									</view>
								</view>
								
								
								
								<text class="bold">具体使用方法：</text><br />
							
								一张任务卡上需要填写或选择的项目有：<br />需求内容、缩略词、预计工时、回馈比、卡片类型、任务说明。<br /><text>\n</text>
								<text class="bold2">·需求内容：</text><br />
								用户点击“需求内容”下方空白处，输入10字左右能简要概括您这次任务需求的文字。<br />
								<text class="beizhu">这段文字将会是其他用户最直观了解您这次任务的方式，请尽量展示重点信息。</text><br /><text>\n</text>

								<text class="bold2">·缩略词：</text><br /> 点击“简称”空白处，输入两个汉字，用以申明这次任务的类型<br />
								<text class="beizhu">例如“文案”、“配送”“设计”等关键词。</text><br />
								<br /><text>\n</text>
								<text class="bold2">·预计工时：</text><br />点击“预计工时”文字区域，将会弹出选择框。滑动选择合适的时间<br />
								<text class="beizhu">作为您预估这次任务的预计总用时，给接卡人提供大致的时间参考。</text>
								<br /><text>\n</text>
								<text class="bold2">·回馈比：</text><br /> 点击“回馈比”文字区域，将会弹出选择框。滑动选择合适的比例。<br /><text>\n</text>
								<text class="beizhu">--如果您开始选择创建的是单项任务卡，那么回馈比选择到100%并会出现数值栏，您在数值栏里填写您愿意为此次任务支付的数值。在任务结束后，这些金额会被100%的回馈给帮你完成任务的接卡人。<br />通俗理解：单项任务是“一锤定音”的“单向买卖”。
								<br /><text>\n</text>--如果您开始选择创建的是多项任务卡，那么制作卡的回馈比选择是自由选择（但制作卡的总回馈比相加要等于100%，*审核卡、资金卡、分发卡是配套于其中，回馈比为100%的单项任务），且每个分项不能超出所对应的审核区间表的设定范围。
								<br />通俗理解：多项任务是渊源不断的持续回报（如果产生了的话）。</text>
								<br /><text>\n</text><text class="bold2">·卡片类型：</text><br />在添加卡片时即可选择。<br /><text>\n</text>

								<text class="bold2">·任务说明：</text><br />点击“任务说明”下方空白处，输入若干文字，用以对任务进行充分说明与设置必要的需求准则。<br />任务说明是创建任务卡非常重要的环节，牵扯到他人是否能对您需求进行充分了解以便更好地完成任务。任务说明中要明确的点通常包括：
								<br /><text>\n</text>1-任务介绍。<br /><text>\n</text>2-制作方法的可执行步骤拆分。
								<br /><text>\n</text>3-最终要达到的标准。
								<br /><text>\n</text>4-提交方式格式。
								<br /><text>\n</text>5-制作用时。<br /><text>\n</text>
								<text class="jinggao">*故而要求任务需求、制作方法明确，步骤条理清晰。验收核对皆以任务说明与后续沟通为准。</text><br />
								
								<text class="beizhu">（任务卡的具体功能与限制参考下面【任务发布详解】）</text>
							</text><br /><text>\n</text>
							<view>
								
							</view>

							
						</view>


						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(2, 4)">
								*接受任务卡功能
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[2][4] ? 'v' : '收起' }}</view>
							</view>


							<view v-if="!isSubPanelCollapsed[2][4]">
								<text>
									&#8195;-注册用户通过首页点击进入选中的任务卡，充分了解任务需求并权衡自身能力可以胜任后<br /><br />
									&#8195;-点击“与发卡人沟通”按钮经行进一步商讨确认。<br /><br />
									&#8195;-最终流程结束任务完成后会得到发卡人预先或后续提供的劳动报酬。<br /><br />
								</text><text>\n\n\n</text>
							</view>
						</view>


						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(2,5)">
								*审核区间功能
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[2][5] ? 'v' : '收起' }}</view>
							</view>

							<!-- 折叠面板 -->
							<view v-if="!isSubPanelCollapsed[2][5]">
								<text>
									<text class="bold2">对审核区间含义的解释：</text><br />
									&#8195;流沙任务系统里的自发项目（非单项）中，因为活动、产品等的后续回报要持续分发给参与人，依靠的就是当初任务制定的<text class="gaoliang">回馈比</text>。<br />
									&#8195;<text class="jinggao">这个比例是每项任务在总项目中所付出劳动量的占比。</text>
									
									<text class="beizhu">·系统里发布任务报酬比例设定是以劳动量为衡量原则。不以劳动时间或劳动质量为准。回馈设定尽量趋近于预估劳动量。<br />
									【劳动量评估即是实践后“劳力付出”量的共识参照。换句话说“做完这个项目所付出的精力是有目共睹的” “只要你做过就知道完成这个步骤需要消耗多少精力”。
									<br />这里面的评价标准不掺杂工期与劳动质量，只有“完成期限”（双方协定的完成时间）和是否“达标于设定”（满不满足双方协定的制作要求）。】</text><br /><text>\n</text>
									
									&#8195;为防止发卡人乱定每项任务的比例，在开设每个单独的任务时所制定的比例不能超过某个合理区间，
									而这个“区间”的设定便是由当前相关行业的专业人士所制定的--
									<text class="gaoliang">「审核区间表」</text><br /><text>\n</text>
									
									 <text class="beizhu">*组内成员有哪些技能就有哪些项目业务。<br />
									成员会什么他才能设立这个职业的分配区间，跟据加入的人数愈多，相应的项目类型也会越多。
									<br />同理,项目分配区间的设定也会随着专业人员的交流,对某项审核区间的迭代变得愈发规范，合理，适用于群众。</text><text>\n\n</text>

									<br /><text class="beizhu">审核区间相关功能包括审核区间列表界面、当前审核区间、修改当前审核区间、建立新的审核区间。</text>
								</text><text>\n\n</text>

								<view>
									<!-- 主面板 -->
									<view class="user-view2" @click="toggleSubPanel(2, 5.1)">
										--创建新审核区间
										<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
											{{ isSubPanelCollapsed[2][5.1] ? 'v' : '收起' }}</view>
									</view>

									<!-- 折叠面板 -->
									<view v-if="!isSubPanelCollapsed[2][5.1]">
										<text>
											<text class="jieshao">-在审核区间列表界面右上方点击“新建审核区间”按钮跳转到建立新的审核区间页面.<br />
											-点击相关空白处依次填写需要的信息，包括：<br /></text><text>\n</text>
											<text class="bold2">--区间分配项：</text><br />
											[区间分配项]指的是组成整条项目产线的阶段性步骤。<br /><br />
											每一个[区间分配项]即对应一张在创建多项任务中的制作卡。[区间分配项]的名称即是任务卡“需求内容”位置填写的主体内容。<br />
											
											<text class="beizhu">例：假设修空调这个项目需要“视频检查判断”、“自购零件”和“上门检修”三个环节，那么这三个环节就是您要创建的[区间分配项]，并且在创建多项任务卡阶段分别创建以这三[区间分配项]为主题的制作任务卡。<br />
											*创建[区间分配项]数量是2个以上。点击“添加步骤”、“删除步骤”即可进行相应操作。请根据实际和自己的理解合理准确配置。</text><br /><text>\n\n</text>
											<text class="bold2">-分配比例区间：</text><br />指对刚才设立的[区间分配项]的分配比例进行区间的设定。<br />
											<text class="beizhu">填写形式为：以“-”支撑于两个自行选择的百分数（左大右小，可精确到小数点后一位）之间。
											例如：20%-40%、0.5%-3.8% 等。</text><br /><br />
											*因为实际项目中，每个工作步骤的量不会是一个定值，总会因实际需求需求不同，某项工作付出的劳动量可能会略高、或略低。但不会超出某一个区间.
											<text class="gaoliang">所以比例区间就是在给浮动的比例做限制，用以保证分配的合理性。</text><br /><text>\n\n</text>
											<text class="bold2">--设立来源：</text><br />项目中每个工作环节都有他设立的理由，请在此区域填写设立[区间分配项]的来源、作用、目的、定位等让其他人经行充分了解。<br />
											<text class="beizhu">例：假如有个"视频制作"的项目，其中“文案”这一[区间分配项]的[设立来源]可以这样填写：“文案是内容的关键，决定视频是否优秀首先从一个好故事开始”。</text><br /><text>\n\n</text>
											<text class="bold2">--分配理由：</text><br />简述您对区间项[分配比例区间]的理由。<br />
											一般通过脑力劳动和体力劳动两个角度去分析。
											<text class="jinggao">秉承着按劳动量进行比例分配的原则，从全局视角去衡量、去揣摩、去权衡，将脑力、体力劳动量合乎情理的、匀称的体现出来。</text><br />
											<text class="beizhu">其脑力体力的分配占比因为各行各业实际情况不同并没有统一标准，但只要亲身做过、实践过的人都会对其所付出的劳动量有一定概念化的体悟.
											[分配理由]就是要将这种关系表达出来。<br /><br />
											以"视频制作"的项目，其中“文案”这一[区间分配项]为例，其[分配理由]可以这样填写：“最核心，脑力劳动付出较多，耗时最长。需要耗时打磨，故设为19~25%”</text><br /><text>\n\n</text>
											*根据以上解释，和下面列举几个范例进行综合理解审核区间。<br />
											<text>-- 此处将插入系统审核区间示例 --</text><br /><text>\n</text>
											
											
											<text class="jinggao">*谨记，如果您的设定不太合理或者含糊其辞，还是会有其他人更专业的成员将其修改，总比例会被迭代到某个衡值上面去的。，故而设定请尽量趋近现实。</text><br /><text>\n</text>
										</text><text>\n\n</text>

									</view>
								</view>

								<view>
									<!-- 主面板 -->
									<view class="user-view2" @click="toggleSubPanel(2, 5.2)">
										--修改已有审核区间
										<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
											{{ isSubPanelCollapsed[2][5.2] ? 'v' : '收起' }}</view>
									</view>

									<!-- 折叠面板 -->
									<view v-if="!isSubPanelCollapsed[2][5.2]">
										<text>
											*在当前审核区间页面，点击修改按钮，进入修改审核区间页面。<br /><br />
											经过与新建审核区间相同的步骤，将您的改动填写好后保存。<br /><br />
											当前修改会保存存在之前的上方，过去的修改记录会一直保存在当前页面上。</text><text>\n\n\n</text>
									</view>

								</view>
								<view>
									<!-- 主面板 -->
									<view class="user-view2" @click="toggleSubPanel(2, 5.3)">
										--查找已有审核区间
										<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
											{{ isSubPanelCollapsed[2][5.3] ? 'v' : '收起' }}</view>
									</view>

									<!-- 折叠面板 -->
									<view v-if="!isSubPanelCollapsed[2][5.3]">
										<text>
											*在搜索栏可以搜索相关的审核区间。</text><text>\n\n\n</text>
									</view>
									
									

								</view>


							</view>
						</view>


						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(2, 6)">
								用户个人相关信息设置与查询
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[2][6] ? 'v' : '收起' }}</view>
							</view>

							<!-- 折叠面板 -->
							<view v-if="!isSubPanelCollapsed[2][6]">
								<text>
									*在个人中心区域您可以找到在流沙任务系统内与您相关的一切信息。
								</text><br /><br />
								
								<text class="bold2">个人页面查看（包括个人界面）</text><br />
								<text class="beizhu">*点击头像区域可以查看个人信息并修改头像。</text><br /><br />
								<text class="beizhu">*在个人展示界面，是一个独立的、陈列您任务信息的、所有注册用户可查看到的页面。
								上部区域是您的姓名与头像，下左半部展示陈列您发布过的任务，下右半部展示陈列您完成过的任务。</text><br /><br />
								<text class="bold2">用户发布任务相关信息查看（历史项目、浏览记录、任务请求）</text><br />
								<text class="beizhu">*历史项目：您作为发卡人的发布过的历史任务都能从中查找到。</text><br /><br />
								<text class="beizhu">*浏览记录：您点击过的任务卡历史记录都会被保存在这里，可随时查看。</text><br /><br />
								<text class="beizhu">*任务请求：处理其他用户对您发布过的任务的任务请求。</text><br /><br />
								<text class="bold2">用户接受任务相关信息查看（待完成、我的支付、任务申请）</text><br />
								<text class="beizhu">*待完成：储存着用户完成过和正在完成的任务列表。</text><br /><br />
								<text class="beizhu">*我的支付：储存着产生过收益的相关任务。总共跟你产生资金交易关系的任务都会被陈列在这里。您可点击查看详细内容。</text><br /><br />
								<text class="beizhu">*任务申请：存放着您对其他任务卡提交的任务申请。</text><br /><br />
								<text class="bold2">帮助中心（技能互助档案、使用说明、用户设置）</text><br />
								<text class="beizhu">*技能互助档案：跳转到外部网页《技能互助档案》。
								是对劳动者技能互助的展示平台，可根据自身技能建立实业产线。当前正在开发中。</text><br /><br />
								
							
								<text class="beizhu">*使用说明：加载本使用说明进行随时查阅。</text><br /><br />
								<text class="beizhu">*绑定手机号：将账号与手机号绑定，用于找回密码。</text><br /><br />
								<text class="beizhu">*绑定银行卡：资金账户管理页面。银行卡号的绑定，用于提供资金或收取资金。</text><br /><br />
								<text class="beizhu">*绑定邮箱：将账号与邮箱号绑定，用于找回密码。</text><br /><br />
								
								<text class="beizhu">*账号注销：关于账号注销的操作。</text><br /><br />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>



		<!-- 第三个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(3)">
				任务卡接受流程
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[3] ? 'v' : '收起' }}</view>
			</view>

			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[3]">
				<!-- 使用 toggleSubPanel(3, ...) 控制子面板的展开和折叠 -->
				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(3, 1)">
						沟通阶段：
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[3][1] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[3][1]">
						<text>
							<text class="bold2">·首页选择任务卡点击进入详情页面</text><br />
							
							·阅读相关信息后自认有接卡能力和意愿后点击“与发卡人沟通”按钮，进入单独的对话页面。双方进行是否愿意相互合作的沟通对话了解。<br /><text>\n\n</text>
						</text>
					</view>
				</view>

				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(3, 2)">
						确定接受任务阶段：
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[3][2] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[3][2]">
						<text>
							<text class="bold2">·接卡人点击“发送接卡请求”。</text><br />
							<br />
							<text class="beizhu">此时接卡人会发送两个按钮，产生两种情况分支:<br /><br />
							---在双方沟通确认过发卡人不满意当期接卡人的情况下，发卡人点击“暂不合适”按钮。
							终止与此接卡人的对话，任务卡解除锁定状态，恢复到首页卡池里流通展示。<br /><br />
							---在双方沟通确认过并愿意相互合作的情况下，发卡人点击“同意接卡”按钮，即确定与此发卡人的合作关系。此时会发送一个确认组件，<br /><br />
							·发卡人在组件中设定完成耗时（倒计时）任务制作开始。</text><br /><text>\n\n</text>
						</text>
					</view>


					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(3, 3)">
							提交验收阶段:
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{ isSubPanelCollapsed[3][3] ? 'v' : '收起' }}</view>
						</view>

						<!-- 折叠面板 -->
						<view v-if="!isSubPanelCollapsed[3][3]">
							<text>
								<text class="bold2">·此时接卡人可以点击两个按钮，共会产生三种情况分支:</text><br />
								<text class="beizhu">
								---倒计时结束前<text class="gaoliang">接卡人按照规定将任务完成且发卡人核对满意的</text>，
								发卡人点击“确认完成”按钮，此任务卡片正式完成，并跳转到完成提示页面。进入后台存档且已产生的页面内容不可修改。<br /><br />
								---倒计时结束前<text class="gaoliang">接卡人未按约定方式提供成果或不达标</text>，
								发卡人可点击“未达到要求”按钮，点击后进入存档且已产生的页面内容不可进行修改接并对接卡人进行一次“标记”，
								标记超过1次，对接卡人账号进行为期一整年的锁定。<br /><br />
								---倒计时结束后<text class="gaoliang">发卡人未对确认组件经行任何操作</text>，
								此任务卡进入存档且已产生的页面内容不可进行修改并对发卡人进行一次“标记”，标记超过1次，
								对发卡人账号进行为期一整年的锁定。</text><br /><text>\n\n</text>
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 第4个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(4)">
				任务卡发布详解
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[4] ? 'v' : '收起' }}</view>
			</view>
			<text class="beizhu">
			    
			    *任务卡片类型与编写详解
			   
			</text>
			<br /><text>\n</text>
			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[4]">
				<view>
					<view class="user-view2" @click="toggleSubPanel(4, 1)">
						审核卡
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[4][1] ? 'v' : '收起' }}</view>
					</view>
					<view v-if="!isSubPanelCollapsed[4][1]">
						<text>
							<text class="bold2"> 审核卡类型包括：</text>单项、多项<br /><text>\n</text>
							<text class="bold2"> 对应对象：</text>任务卡<br /><text>\n</text>
							<text class="bold2">
								简述理解：</text>审核卡是判断多项任务是否可以进入卡池流通的一个标准步骤，任何注册成员皆有权接受执行。<br /><text>\n</text>
							<text class="bold2"> 使用功能与范围有无限制：</text>有 （仅针对任务卡的辨别，不涉及产生产品成果）<br /><text>\n</text>

							<text class="bold2">卡片效用范围：</text><br />
							<text class="gaoliang">1-对本次多项任务中各个制作卡回馈比有无超出与之对应的审核区间进行审核。</text><br />
							<text class="bold2">具体编写要求：</text><br />
							<text class="jieshao">1.需要写明本次总项目出自哪个审核区间，要将审核区间的名称准确的写出来。</text><br />
							<text class="jieshao">2.将自己给本次发布的每张制作卡所制定的回馈比列出来，要保证总体相加等于100%。</text><br />
							<text class="jieshao">3.并且申明对于本次总项目的发布有无初始资金。</text><br /><text>\n</text>
							<text class="bold2">发布示例：</text><br />
							<image class="swiper-item-image" src="https://liusha-gy.com/flow/static/p1.png">
							</image>
						<text>-- 此处将插入系统内审核任务卡示例并替换这张 --</text>
							<text>\n\n</text>

							<text class="gaoliang">2-任务指向：对已完成的任务经行复查审核。</text><br />
							如果你认为某个任务存在违法或不合理操作，可以发布一张审核卡对其进行公开交流信息的审核。
							<text class="jinggao">*审核卡不能审核审核卡，建设卡才能审核审核卡。</text><br />
							<text class="bold2">具体编写要求：</text><br />
							<text class="jieshao">1.写明需要审查的任务卡号</text><br />
							<text class="jieshao">2.明确被审查的是发卡人还是接卡人。</text><br />
							<text class="jieshao">3.填写审查要素。列举出原任务卡的存有异议的地方。</text><br />
							<text class="jieshao">4.写好本张任务卡的任务说明，即：让本张任务卡的接卡人联系、收集被审核任务卡的双方对异议点的沟通记录和双方提供对异议点的实际操作证明。</text><br />

							<text>\n</text>
							<text class="bold2">发布示例：</text><br />
							<text>-- 此处将插入系统内审核任务卡示例 --</text>
								<text>\n\n</text>
						</text>
					</view>
				</view>

				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(4, 2)">
						制作卡
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[4][2] ? 'v' : '收起' }}</view>
					</view>
					<view v-if="!isSubPanelCollapsed[4][2]">
						<text>
							<text class="bold2"> 制作卡类型包括：</text>多项<br /><text>\n</text>
							<text class="bold2">
								对应对象：</text>任务卡对应实际对象是劳动量转化出来的实际成果（可包括产品、实物、服务等），不对应于任务卡。<br /><text>\n</text>
							<text class="bold2">
								简述理解：</text>制作是多项任务的核心，基本整条任务产线是由制作卡以必要任务步骤的形式拆分出来的。<br /><text>\n</text>
							<text class="beizhu">*制作卡是任务系统最广泛的任务形式，其操作的形式内容也无法给予具体限定。能限制任务类型与方式的只有法律法规和人民群众的想象力。
							基本囊括整个制造业的范畴，部分服务业也可以被转换进来比如：送餐运输、教育、人力服务、衣食住行等生活的方方面面，任何环节具有</text>
							<text class="gaoliang">“角色替代性”</text><text class="beizhu">的劳动皆可被建立发布。</text><br /><text>\n</text>
							<text class="bold2"> 使用功能与范围有无限制：</text>无（国家法律法规限制范围内）<br /><text>\n</text>

							<text class="bold2">卡片效用范围：</text><br />
							<text class="gaoliang">根据现实需求自行设置。</text><br />
							
						<text class="bold2">具体编写要求：</text><br />
						<text class="jieshao">1.明确任务目标</text><br />
						<text class="jieshao">2.介绍任务内容</text><br />
						<text class="jieshao">3.写清楚想让接卡人进行的实际操作的操作步骤。</text><br />
						<text class="jieshao">4.申明提交要求、提交方式、验收标准、制作期限等任何关于任务完成的补充性说明</text><br />
						
						
							<br />
							<text class="bold2">发布示例：</text><br /><text>\n</text>
		<text>-- 此处将插入系统内制作任务卡示例 --</text>
							
						</text><br /><text>\n\n</text>
					</view>

					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(4, 3)">
							资金卡
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{ isSubPanelCollapsed[4][3] ? 'v' : '收起' }}</view>
						</view>
						<view v-if="!isSubPanelCollapsed[4][3]">
							<text>
								<text class="bold2"> 资金卡类型包括：</text>单项、多项<br /><text>\n</text>
								<text class="bold2"> 对应对象：</text>实际活动。<br /><text>\n</text>
								<text class="bold2"> 简述理解：</text>资金卡的定位对应现实中财务的工作。<br />由资金卡的接卡人处理发卡人提供的相关财务工作。
								所以要求的是发卡人将详细的对于制作任务卡所牵扯到的实际资金财务流动统计材料（比如总账报表、存货、税务、预算成本、成本分析、现金出纳、银行出纳等相关文件）交给接卡人。<br />对于后续收入的执行方法、手段、地点、依据、查询确认等都要由发卡人标记清楚。<br /><text>\n</text>
								<text class="beizhu">*比如您制作一部电影的项目，票房收入将按比例持续发放给参与制作的人员。那么您在资金卡设立时就需要标名票房收入的账户或制作成品可查询到的实际发布源，由此资金卡的接卡人来操作相关手续，并把发放渠道整理出来，交与发卡人。再由发卡人发布分发卡，将资金发放到具体参与人员手中。</text><br /><text>\n</text>
								<text class="bold2">
									使用功能与范围有无限制：</text>有，且仅限关于资金数据的整理活动，不涉及项目制作及其成果.。<br />
									
									

								<text class="bold2">卡片效用范围：</text><br />
								<text class="gaoliang">1-承担作用于任务上的某项财务工作</text><br />
								
								<text class="bold2">具体编写要求：</text><br />
								<text class="jieshao">1.申明有无初始资金。</text><br />
								<text class="beizhu">-如果有，第一次资金卡就写明如何发放这笔资金和后续资金的处理方法</text><br />
								<text class="beizhu">-若没有，但有后续资金（即通过本次任务项目赚取的），也需写明。</text><br />
								<text class="beizhu">-若本身是无收益的项目，也需写明。</text><br />
								<text class="jinggao">*资金卡和分发卡是在随着多项任务初始建立的时候填写一次，后续产生流水后可单独发卡。</text><br /><text>\n</text>
								<text class="jieshao">2.写明制作结果使用场景</text><br />
								<text class="beizhu">-罗列出本项目劳动成果的使用场景（即：用在什么地方）</text><br />
								<text class="jinggao">包含地点、平台、范围、使用时间等。 后续考察若如与设定不符则视为违规。</text><br />
								<text class="jieshao">3.写清项目收益方式</text><br />
								<text class="beizhu">-罗列出本项目可能产生的收益路径，用以后续核对。</text><br />
								<text class="jinggao">若如核查到本项目工作的成果有在其他未标记出的地方产生收益，将判定本项目为违规任务。</text><br />
								<text class="jieshao">4.备注一些可能发生变动状况和补救措施</text><br /><br />
								<text class="jieshao">5.填写让接卡人操作的具体资金整理流程</text><br />
								<text class="beizhu">-根据自身项目情况填写让接卡人整理资金的具体操作步骤。</text><br />
								<text class="jinggao">***资金卡的填写应在发卡人认为不泄露自己商业机密的情况下提供所有必要文件***</text><br /><text>\n</text>
								
								<text class="bold2">发布示例：</text><br /><text>\n</text>
								<text>-- 此处将插入系统内制作任务卡示例 --</text><br />
								
								

								
								<text class="gaoliang">2-单独对某项活动进行财务处理工作</text><br />
								<text class="bold2">具体编写要求：</text><br />
							    <text class="jieshao">发布步骤与1相同，只不过对象是系统创建任务以外的自行提供的的数据。属单项任务卡。</text><br />
								<br />

								<text class="bold2">发布示例：</text><br /><text>\n</text>
								<text>-- 此处将插入系统内制作任务卡示例 --</text>
							</text>
						</view>

						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(4, 4)">
								分发卡
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[4][4]? 'v' : '收起' }}</view>
							</view>
							<view v-if="!isSubPanelCollapsed[4][4]">
								<text>
									<text class="bold2">分发卡类型包括：</text>单项、多项<br /><text>\n</text>
									<text class="bold2"> 对应对象：</text>实际活动。<br /><text>\n</text>
									<text class="bold2">
										简述理解：</text>起执行功能，系统里关于分发的活动皆可发布分发卡。分发卡的定位对应现实中一部分出纳的工作，对资金的分发等，还可进行对知识技能、物资的分发。<br /><text>\n</text>
									<text class="bold2">
										使用功能与范围有无限制：</text>有 &#8195; 不针对任务卡，不涉及项目及其成果。<br /><br /><text>\n</text>

									<text class="bold2">卡片效用范围：</text><br />
									<text class="gaoliang">1-承担多项任务里资金卡总结出的实际执行问题</text><br />
									<text class="bold2">具体编写要求：</text><br />
									<text class="jieshao">1.申明分发途径和资金来源</text><br />
									<text class="beizhu">-即提供资金卡整理出的《分发表》</text><br />
									<text class="jieshao">2.具体的操作步骤，大致可以包括以下几个方面，细节根据实际情况自行调整：</text><br />
									<text class="beizhu">一.本张分发卡的接卡人向发卡人索要被分发人员的站内id或联系方式</text><br />
									<text class="beizhu">二.本张分发卡的发卡人将由资金卡整理出的相关《分发表》发给接卡人</text><br />
									<text class="beizhu">三.本卡的接卡人联系各个需分发资金的任务卡的发卡人，询问资金接收方式。（微信、支付宝、银行卡、现金等）</text><br />
									<text class="beizhu">四．将所得资金按《分发表》的数据按发卡人提供的资金数据分发给对应的人员。并且需要得到人员的收到证明，并需要留下存据（截图、视频、语音等方式不限）。</text><br />
									<text class="beizhu">五．将存据返回给发卡人，分发任务就算结束。</text><br />
									
									
									<br />
									<text class="bold2">发布示例：</text><br /><text>\n</text>
									<text>-- 此处将插入系统内分发任务卡示例 --</text><br />
									<text>\n\n</text>
									
									<text class="gaoliang">2-技能课程分享的安排发布。</text><br />

									
									<text class="beizhu">假如你通过查询技能共享表找到想学习组内某种技能时， 
									首先你需先发一张【信息】卡经行询问，直接提出要求：想要习得了解某某技能（指定人教也可以）。当身赋这个技能的人愿意分享的时候，ta就会接这张卡跟你沟通。 
									然后你就可以跟他商量技能传授方式（视频？图文？亲授？公开？对个人？）、具体时间、是否需要报酬、多少等等。谈完之后结束这张信息卡。 
									再由这位技能人发一张【分发】卡，将谈好的事项执行下去即可。（等于将自己的技能“分发”了出去。自己去接这张卡，报酬填零，别忘了将执行步骤写好，虽然是是自己动手但也有一定概率被别人接到）。 
									*假如期间谈的需要给技能人一定的资金支持，那么就再发一张带指定人描述的【分发】卡，将所需资金“分发”给技能人。</text><br />

									<text class="bold2">发布示例：</text><br /><text>\n</text>
									<text>-- 此处将插入系统内分发任务卡示例 --</text><br />
									
									<text>\n\n</text>
								</text>
							</view>
						</view>

						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(4, 5)">
								信息卡
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{isSubPanelCollapsed[4][5] ? 'v' : '收起' }}</view>
							</view>
							<view v-if="!isSubPanelCollapsed[4][5]">
								<text>
									<text class="bold2">信息卡类型包括：</text>单项<br /><text>\n</text>
									<text class="bold2"> 对应对象：</text>任务卡<br /><text>\n</text>
									<text class="bold2"> 简述理解：</text>“您想知道什么信息，便问出来。” <br />
									信息卡的内容可以千百多多样，但它围绕的主题即只有一种即：关于信息交换。<br />交换内容仅限于“获取信息”。也就是说，信息卡不会像制作一样拿劳动力转换成实际产出，也不是像审核卡那样操作对象对卡不对人的专一。<br />信息卡是单纯的对信息的购买活动，发卡人带价提问出他所需要的信息问题（仅限公开信息，例如知识、行情等），接卡者提供相应的信息答案并领取回报。<br />是单纯的“提问题-回答问题”的形式。<br /><text>\n</text>
									
									<text class="bold2"> 使用功能与范围有无限制：</text>仅限信息层面<br /><text>\n</text>

									<text class="bold2">卡片效用范围：</text><br />
									<text class="gaoliang">1-非转换实际产品成果的信息交换均可发布任务卡</text><br />
									<text class="bold2">具体编写要求：</text><br />
									<text class="jieshao">以问题的形式提出自己想知道的信息需求</text><br />
									<text class="beizhu">-别忘了添加对回答要求的约束条件。例如回答时间、回答方式、回答内容范围等等。</text><br />
									<text class="beizhu">-创建制作卡之前也可以用信息卡搜集的必要信息，确保合理创建。</text><br />
									<text class="jinggao"> （*注意，信息卡严禁交易中国公民个人信息。详情见《中华人民共和国刑法修正案（七）》第二百五十三条。信息交换内容不得涉及违法犯罪活动，违反需承担相关法律责任）</text><br /><text>\n</text>
									<text class="bold2">发布示例：</text><br /><text>\n</text>
									<text>-- 此处将插入系统内信息任务卡示例 --</text><br /><text>\n</text>
									
									
								</text>
							</view>
						</view>

						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(4, 6)">
								技术卡
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[4][6] ? 'v' : '收起' }}</view>
							</view>
							<view v-if="!isSubPanelCollapsed[4][6]">
								<text>
									<text class="bold2"> 技术卡类型包括：</text>单项<br /><text>\n</text>
									<text class="bold2"> 对应对象：</text>技术<br /><text>\n</text>
									<text class="bold2"> 简述理解：</text>技术卡与信息卡类似，是以寻求和实践研究为基本形式的任务卡。<br />
									核心是以“问答”的形式作为任务需求，直接将所遇到的或想要解决的各种职业技术问题提将出来，由其他用户解答。<br />技术问题的大小不限，繁琐程度不限。但您需要对其进行清晰的表述。<br />
									技术卡不具备实际制作效益，相当于在教会发卡人技术问题。<br />
									具体示例：***是怎样***的
									*********求解<br />
									*注意，在发卡人选定接卡人回答时，建议先核对接卡人的相关专业资历，并最好要求提供答案的专业化、权威化的出处，以便保证技术答案的真实和有效性。<br /><text>\n</text>
									<text class="bold2"> 使用功能与范围有无限制：</text>仅限信息层面<br /><text>\n</text>

									<text class="bold2">卡片效用范围：</text><br />
									<text class="gaoliang">1-个人对某些技术问题的求解，大部分对象是对已有的技术。</text><br />
									<text class="bold2">具体编写要求：</text><br />
									<text class="jieshao">1.同信息卡，只不过更偏技术类。</text><br />
									<text class="beizhu">*注意，在发卡人选定接卡人回答时，建议先核对接卡人的相关专业资历，并最好要求提供答案的专业化、权威化的出处，以便保证技术答案的真实和有效性。</text><br />
									<text class="bold2">发布示例：</text><br /><text>\n</text>
									<text>-- 此处将插入系统内技术任务卡示例 --</text><br /><text>\n</text>
									<text class="gaoliang">2-技术探索类，对未有的技术创新进行悬赏。</text><br />
									<text class="bold2">具体编写要求：</text><br />
									<text class="jieshao">同第一条，只不过是属于实验性的任务卡，对研究成果并非有必须的要求。</text><br />
									
									<text class="bold2">发布示例：</text><br /><text>\n</text>
									<text>-- 此处将插入系统内技术任务卡示例 --</text><br /><text>\n</text>
									
								</text>
							</view>
						</view>

						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(4, 7)">
								建设卡
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[4][7]? 'v' : '收起' }}</view>
							</view>
							<view v-if="!isSubPanelCollapsed[4][7]">
								<text>
									<text class="bold2"> 建设卡类型包括：</text>单项<br /><text>\n</text>
									<text class="bold2"> 对应对象：</text>直接作用于本流沙系统，不作用于人、事，物。<br /><text>\n</text>
									<text class="bold2"> 简述理解：</text>对流沙任务系统结构整体框架的改动升级要求时可以发建设卡<br /><text>\n</text>
									<text class="bold2"> 使用功能与范围有无限制：</text>有 （接卡对象基本为开发者）<br /><text>\n</text>
<text class="bold2">卡片效用范围：</text><br />
									<text class="gaoliang">1-有升级系统需要时可发布</text><br />
									<text class="bold2">具体编写要求：</text><br />
									<text class="jieshao">1.先列出本张卡想达到的升级内容</text><br />
									<text class="beizhu">将本次针对现有版本做的改进出列出来。并阐明原因和预期效果。</text><br />
									<text class="jinggao">*您的提议运行的升级改动不可对流沙任务系统的基础理念设计进行更变，您可以提出在其基础上根据现实情况做出的优化方案。</text><br />
									<text class="jieshao">2.您需要自备升级所需的代码，开发者接到建设卡后会直接将其带入。您需要先简述代码对应作用。</text><br />
									
									<text class="beizhu">以下为步骤：</text><br />
									<text class="beizhu">一.您需要将改进后的代码提交给管理者，并已经做过测试，确保直接代入即可使用。</text><br />
									<text class="beizhu">二.简述您的代码部分是如何实现您的升级改动目标的。</text><br />
									<text class="beizhu">三.您提交的改动升级目标需要先告知小程序主体的运营者
    联系方式*******</text><br />
									<text class="beizhu">经过运营者人工审核后无侵犯、损害流沙任务系统及其用户主体和无违法犯罪嫌疑的，方可由小程序主体的运营者代理更新。</text><br />
									<text class="beizhu">四.标明改动的预计达到效果的时间和评判标准，30个工作日内没有达成预期效果的，系统将会退回上一个版本。</text><br />
								</text>
								<text class="bold2">发布示例：</text><br /><text>\n</text>
								<text>-- 此处将插入系统内技术任务卡示例 --</text><br /><text>\n</text>
								<br /><text>\n</text>
								<text class="gaoliang">2-对审核卡进行核查</text><br />
								<text class="bold2">具体编写要求：</text><br />
								<text class="jieshao">1.写明需要被审核的卡号。</text><br />
								<text class="jieshao">2.申明异议点。</text><br />
								
								
								<text class="beizhu">接卡人一般是开发者，通过调用系统数据中被审核任务卡的原始交流数据，再与之异议产生时双方各自提供的数据（即被审核卡的内容）做对比即可评定出异议点的真伪性。</text><br />
								<text class="bold2">发布示例：</text><br /><text>\n</text>
								<text>-- 此处将插入系统内技术任务卡示例 --</text><br /><text>\n</text>
							</view>
						</view>
					</view>
					
					<text class="bold2">*关于任务说明的提示：</text><br />
					<text class="gaoliang">严谨度</text><br />
					<text class="beizhu">如果您的工作类型是需要比较高的准确性的，那么您在要求步骤的处理上就需要提高严谨程度，各种“条条框框”的说明一定要到位。</text><br />
					<text class="gaoliang">开放性</text><br />
					<text class="beizhu">如果您是自己也把握不住最终成果的样貌，或者本身行业的项目就属于不是要一个确定的结果。那么您在任务说明里设定好其他必要的要求后，大可来加上一句：“在之前限定的范围内可以尽情发挥”，给足接卡人制作的余地。重点放到判断选择接卡人资质、沟通上去。</text><br />




				</view>
			</view>
		</view>
	</view>

	<!-- 第5个折叠面板 -->
	<view style="position: relative;margin-left: 10rpx ;">
		<!-- 主面板 -->
		<view class="user-view" @click="togglePanel(5)">
			任务卡硬性规则与原则
			<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">{{ isPanelCollapsed[5] ? 'v' : '收起' }}
			</view>
		</view>

		<!-- 折叠面板 -->
		<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[5]">
			<view>
				<!-- 主面板 -->
				<view class="user-view2" @click="toggleSubPanel(5, 1)">
					合理有效原则
					<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
						{{ isSubPanelCollapsed[5][1] ? 'v' : '收起' }}</view>
				</view>
				<view v-if="!isSubPanelCollapsed[5][1]">
					<text>
						【发卡人对自己的需求要有一定程度理解才可以，创建任务不可含糊其辞，不可儿戏。认真对待每个需求
						，要站在接卡人完成的角度上设立任务。谨言慎行,资源有序。节省服务器资源不乱发卡。】<br /><br />
					</text>
				</view>
			</view>

			<view>
				<!-- 主面板 -->
				<view class="user-view2" @click="toggleSubPanel(5, 2)">
					量力而为原则
					<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
						{{ isSubPanelCollapsed[5][2] ? 'v' : '收起' }}</view>
				</view>
				<view v-if="!isSubPanelCollapsed[5][2]">
					<text>
						【发卡人不故意压缩时间和难度，接卡者看到过于离谱或超出能力范围的就量力而行也不要去硬接。双方都要在任务上留余地，留额度。】<br /><br />
					</text>
				</view>


				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(5, 3)">
						负责绝对至上原则
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[5][3] ? 'v' : '收起' }}</view>
					</view>
					<view v-if="!isSubPanelCollapsed[5][3]">
						<text>
							【完成任务是接卡人的第一要务。希望一旦在流沙任务系统中接受任务，请务必腾出必要时间去百分百负责的去对待。<br />
							它关联着两个人、组织成员之间的信任意义，是相互合作互助的基石。】
						</text>
					</view>

					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(5, 4)">
							相关硬性规则
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{isSubPanelCollapsed[5][4] ? 'v' : '收起' }}</view>
						</view>
						<view v-if="!isSubPanelCollapsed[5][4]">
							<text style="color: #ff0000;">
								***所创建任务需在法律法规约束的范围内，不得创建有违规违法内容的任务；发布违规内容将受到相应处罚并承担法律责任。详情请阅读
								
								<text class="gaoliang" @click="toabout" >《流沙任务系统用户服务协议》</text>
								的内容***
							</text><br /><text>\n</text>
							<text class="beizhu">任何没被封禁的交过年费的确认使用系统功能的注册用户（以下简称为“成员”）</text><br />
							<text class="bold2">·成员发布任务卡的数量没有限制；</text><br /><text>\n</text>
								
								<text class="bold2">·发卡、接卡的进程允许同时进行</text><br />
								<text class="beizhu">&#8195;例如：成员在自身发布的任务被完成期间可以继续发布或接受其他成员的任务；成员在完成其他成员的任务期间可以发布自己的新任务；</text><br /><text>\n</text>
								<text class="bold2">·成员接受的进行中的任务有且只能同时存在的数量是： </text><text class="gaoliang">1</text><br />
							
								<text class="beizhu">&#8195;换句话说：成员接任务是有限制的，必须是做完一个才能去接下一个。而发布任务不限数量。</text><br /><text>\n</text>
								<text class="bold2">·成员自己发布的任务卡可以由来自己接。</text><br />
								<text class="beizhu">以应对某些本身发布不合理导致长期无人接受的状况。</text><br /><text>\n</text>
								<text class="bold2">·成员在与发卡人沟通时，任务卡会在首页隐藏锁定，</text><br />
								<text class="beizhu">待发卡人终止对话或自己关闭对话时，任务卡解除锁定状态，恢复到首页卡池里流通展示。</text><br /><text>\n</text>
								<text class="bold2">·成员皆有权在任何时间查看、接受系统里未在执行期间的任务卡（包括未接受和已完成）。也可以发布任何类型的任务卡。</text><br /><text>\n</text>
								<text class="bold2">·成员在被审核卡通知后，必须根据要求提供相关信息。没在规定时间内提交算做违规。</text><br /><text>\n</text>
								<text class="bold2">·成员有在进行中任务时，不得发布与其相似或相同的任务（包括任务内容、任务目标等元素）。</text><br /><text>\n</text>

								<text class="bold2">·发卡人与接卡人对接时，接卡人多数是以上传凭证为主，
								亦可提供实际能让发卡人实际确认的实物文件地址以供其确认。更具体的形式以双方协定的方式为主。</text><br /><text>\n</text>
							<text class="bold2">·发卡人在点击“确认接卡”后，即视为双方达成要约关系。其间产生的各项活动将到受法律保护并具有法律效力。</text><br /><text>\n</text>
								

							<br /><text>\n\n\n</text>
						</view>
					</view>
				</view>
			</view>
		</view>





		<!-- 第6个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(6)">
				违规行为判定与处罚
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[6] ? 'v' : '收起' }}</view>
			</view>


		
			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[6]">
				
				
				
				
				<view @click="toabout" class="user-view2" style="display: flex;flex-direction: row; position: relative">
							<view>《用户协议》</view>
							<view style="position: absolute;right: 30rpx;">></view>
						</view>
						
						<view @click="topbout" class="user-view2" style="display: flex;flex-direction: row; position: relative">
							<view>《隐私政策》</view>
							<view style="position: absolute;right: 30rpx;">></view>
						</view>
						
						<view @click="tocbout" class="user-view2" style="display: flex;flex-direction: row; position: relative">
							<view>《成本分摊方略》</view>
							<view style="position: absolute;right: 30rpx;">></view>
						</view>
				
	
				
				
				
				
				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(6, 1)">
						·单向违规
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[6][1] ? 'v' : '收起' }}</view>
					</view>
					<view v-if="!isSubPanelCollapsed[6][1]">
						<text>
							<text class="jieshao">--未按操作流程进行正常接、发任务的</text><br />
						
							包括：<br />
							<text class="beizhu">·任务项目劳动成果的实际使用场景与资金卡预留的不相符的。</text><br />
							<text class="beizhu">·项目实际收益方式与资金卡预留不相符的。</text><br />
							<text class="beizhu">·任务设立内容涉嫌违法犯罪活动的（如：诈骗、黄赌毒、投机等）。</text><br /><br />
							
							<text class="jieshao">-不正当使用系统本身设定功能，行为导致系统破坏、损毁、消减、停滞的。</text><br /><br />
							<text class="jieshao">--用户个人违背《流沙任务系统用户服务协议》的</text><br /><br />
							<text class="jieshao">--在审核卡、资金卡、分发卡的任务中若接卡人向发卡人索要必要的文件时，
							如若发卡人不及时提供导致任务未完成，则判为发卡人违规。</text><br />
							
							<text class="gaoliang">*以上单向违规范围内条例触发后，相关单个用户会被以“次数”进行“标记”。</text><br /><br />
							
						</text>
					</view>
				</view>

				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(6, 2)">
						·双向违规
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[6][2] ? 'v' : '收起' }}</view>
					</view>
					<view v-if="!isSubPanelCollapsed[6][2]">
						<text>
							<text class="jieshao">--任务创建违背《流沙任务系统用户服务协议》且接、发双方在知情的情况下继续进行的。</text><br /><br />
							<text class="jieshao">--未按卡片类型的原本设定范围发布并有接卡人接卡完成的。
							<text class="beizhu">例如：利用信息卡发布制作卡的内容。
							（发布内容里的判断边界决议不清有异议的，最终由开发者判断与定夺发布内容有无超出原卡片的功能设定范围）</text><br />
							</text>
							
							
							<text class="gaoliang">*以上双向违规范围内条例触发后，相关任务接发双方用户会被以“次数”进行“标记”。</text><br /><br />
						</text>
					</view>


					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(6, 3)">
							处罚方式
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{ isSubPanelCollapsed[6][3] ? 'v' : '收起' }}</view>
						</view>

						<!-- 折叠面板 -->
						<view v-if="!isSubPanelCollapsed[6][3]">
							<text>
								<text class="gaoliang">对触犯违规行为的用户账号进行“标记”。</text><br /><text>\n\n</text>
								<text class="bold2">>标记：</text>无资金处罚，用户账户被系统以程序性标记。标记每超过<text class="gaoliang">1</text>次可进行封禁。<br /><text>\n\n</text>
								<text class="bold2">>封禁：</text>剥夺账号使用权。封禁期间用户任务产生的短期与后续收益将注入公共资金池。且封禁时间到后标记减<text class="gaoliang">1</text>且解除封禁状态。<br /><text>\n\n</text>

								<text class="gaoliang">*所有注册用户在正常使用的情况下有且只有1次被标记的机会。标记每超过1
								次，对发卡人账号进行为期一整年的锁定。锁定期间无法进入平台。</text><br /><br />
								<br /><text>\n\n</text>
							</text>
						</view>



						<view>
							<!-- 主面板 -->
							<view class="user-view2" @click="toggleSubPanel(6, 4)">
								公共资金池
								<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
									{{ isSubPanelCollapsed[6][4] ? 'v' : '收起' }}</view>
							</view>

							<!-- 折叠面板 -->
							<view v-if="!isSubPanelCollapsed[6][4]">
								<text class="gaoliang">·收集</text><br />
								<text class="jieshao">---收取注册用户所的“年费”会被直接注入公共资金池。</text><br /><text>\n</text>
								<text class="jieshao">---任务违规后，相关长期、既定的收益会转入公共资金池。</text><br /><text>\n</text>
								<text class="jieshao">---因平台本身的效应而产生的营收（例如平台内打的广告），除去联系人、制作人的部分后，所得剩余收益将注入公共资金池。</text><br /><text>\n</text>
								<text class="jieshao">---公共资金池归零时无需主动填充。</text><br /><text>\n</text>
								<text class="jieshao">---公共资金池归内资金不足以支付基础消耗费用时由开发者填充。</text><br /><text>\n</text>
								<text class="jieshao">---允许注册用户对资金池经行捐赠。</text><br /><text>\n</text>
								<text class="jieshao">---其他未探索出的途径.</text><br /><text>\n\n</text>
								<text class="gaoliang">·使用</text><br />
								<text class="jieshao">---当公共资金池存在资金时，</text><br />
								<text class="beizhu">&#8195;·首先填充系统运行维护的基础费用的公共支出；</text><br />
								<text class="beizhu">&#8195;·其余额次之用于利于全体成员的活动经费；</text><br />
								<text class="beizhu">&#8195;·再次之之余额用于无劳动能力注册用户的补贴规程上。</text><br /><text>\n</text>
								<text class="jinggao">---当系统运行维护的基础消耗费用被扣除时，将计算此时所有注册满一年并交过年费的用户数量，
								并以此为基数，将为期一年的年费扣除基础消耗费用后所剩的资金，平均返还给相关的注册用户。</text><br />
								<text class="jieshao">---支持于涉利于全体注册用户、流沙任务系统的其他待开发的路线时可被使用（由开发者进行判定）。</text><br /><text>\n</text>
						
							
							</view>
							
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 第7个折叠面板 -->
		<view>
			<!-- 主面板 -->
			<view class="user-view" @click="togglePanel(7)">
				系统信息
				<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
					{{ isPanelCollapsed[7] ? 'v' : '收起' }}</view>
			</view>

			<!-- 折叠面板 -->
			<view style="position:relative;margin: 0 60rpx;" v-if="!isPanelCollapsed[7]">
				<text>
					<text>\n\n</text>
					<text class="bold">特别鸣谢：向先生</text><br /><br /><text>\n\n</text>
				</text>
				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(7, 1)">
						开发人员
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[7][1] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[7][1]">
						<text>
							<text class="bold"> 区间分配项</text>---接卡人<br /><text>\n</text>
							<text class="bold"> 提供初始立项策划案</text>--子房桑<br /><text>\n</text>
							<text class="bold"> UI等设计</text>--子房桑<br /><text>\n</text>
							<text class="bold"> 整理项目需求</text>--子房桑<br /><text>\n</text>
							<text class="bold"> 需求技术核实</text>--子房桑<br /><text>\n</text>
							<text class="bold"> 美术提供 UI文件</text>--子房桑<br /><text>\n</text>
							<text class="bold"> 编写、配置小程序框架</text>--向先生<br /><text>\n</text>
							<text class="bold"> 编写、配置小程序组件</text>--子房桑<br /><text>\n</text>
							<text class="bold"> 对接后台API等后端配置</text>--向先生<br /><text>\n</text>
							<text class="bold"> 配置调试服务端</text>--向先生<br /><text>\n</text>
							<text class="bold"> 测试</text>接卡人<br /><text>\n</text>
							<text class="bold"> 反馈修改</text>接卡人<br /><text>\n</text>
							<text class="bold"> 其他技术帮助</text>--苏同学<br /><text>\n</text>
						</text>
					</view>
				</view>

				<view>
					<!-- 主面板 -->
					<view class="user-view2" @click="toggleSubPanel(7, 2)">
						开发涉及
						<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
							{{ isSubPanelCollapsed[7][2] ? 'v' : '收起' }}</view>
					</view>

					<!-- 折叠面板 -->
					<view v-if="!isSubPanelCollapsed[7][2]">
						<text>
							<text class="bold"> 联系开发人员</text><br />电子邮箱：2541613004@qq.com<br />微信号：mxt0796<br /><text>\n</text>
						</text>
					</view>


					<view>
						<!-- 主面板 -->
						<view class="user-view2" @click="toggleSubPanel(7, 3)">
							其他
							<view style="position: absolute; right: 30rpx;;margin-top: -40rpx;">
								{{ isSubPanelCollapsed[7][3] ? 'v' : '收起' }}</view>
						</view>

						<!-- 折叠面板 -->
						<view v-if="!isSubPanelCollapsed[7][3]">
							<text>
								流沙社区欢迎您
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>



		<!-- 添加更多折叠面板... -->



	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPanelCollapsed: {
					1: true,
					2: true,
					2.2: true,
					3: true,
					4: true,
					5: true,
					6: true,
					7: true
				},
				isSubPanelCollapsed: {
					2.2: {
						1: true,
						2: true,

					},
					2: {
						1: true,
						2: true,

						3: true,
						4: true,
						5: true,
						6: true,
						// 添加更多子面板...
					},
					3: {
						1: true,
						2: true,
						3: true,
						// 添加更多子面板...
					},
					4: {
						1: true,
						2: true,
						3: true,
						4: true,
						5: true,
						6: true,
						7: true,

					},
					5: {
						1: true,
						2: true,
						3: true,
						4: true,

					},
					6: {
						1: true,
						2: true,
						3: true,
						4: true,
					},
					7: {
						1: true,
						2: true,
						3: true,

					},
					// 添加更多主面板...
				},
			};
		},
		methods: {

			toabout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/about/about"
				});
			},
			
			topbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/privacy/privacy"
				});
			},
			
			tocbout(e) {
				uni.navigateTo({
					url: "/pages/userCenter/cost/cost"
				});
			},
			
			togglePanel(panelNumber) {
				this.isPanelCollapsed[panelNumber] = !this.isPanelCollapsed[panelNumber];
			},
			toggleSubPanel(panelNumber, subPanelNumber) {
				this.isSubPanelCollapsed[panelNumber][subPanelNumber] = !this.isSubPanelCollapsed[panelNumber][
					subPanelNumber
				];
			},
		},

		// onLoad() {
		// 	this.$store.commit("initHasLogin");
		// 	this.$store.commit("initUserInfo");

		// },

		// created() {
		// 	this.hasLogin = this.$store.getters.hasLogin();
		// }

	}
</script>

<style>
	.swiper-item-image {
		width: 100%;
		height: 315rpx;
	}

	.user-view {
		width: auto;
		/* 自适应内容宽度 */
		margin-left: 1px;
		margin-top: 2px;
		margin-bottom: 2px;
		border-radius: 5px;
		box-sizing: content-box;
		padding-left: 15px;
		/* 右缩进 */
		border: 1px solid #6c4ad1;
		background-color: rgb(255, 255, 255);
		color: #4723b3;
		font-size: 40rpx;
		margin-bottom: 10px;
		padding-top: 10px;
		/* 上内边距设置为 10px */
		padding-bottom: 10px;
		/* 下内边距设置为 10px */
		/* background-image: -webkit-linear-gradient(0deg, #9781da 0%, #999fd8 100%);*/
	}

	.user-view2 {

		margin-left: 5px;
		margin-top: 0px;
		margin-bottom: 2px;
		border-radius: 5px;
		padding-left: 15px;
		/* 右缩进 */
		box-sizing: content-box;
		border: 0px solid rgb(245, 245, 245);
		background-color: rgb(255, 255, 255);
		color: #6c4ad1;
		font-size: 30rpx;

		padding-top: 0px;
		/* 上内边距设置为 10px */
		padding-bottom: 10px;
		/* 下内边距设置为 10px */
		/* background-image: -webkit-linear-gradient(0deg, #9781da 0%, #999fd8 100%);*/
		
		text-decoration: underline;
	}


.jinggao {
  display: flex; 
  font-size: 18rpx;
  color: #ffffff;
  background-color: #ffaa00;
  height: 150rpx;
  align-items: center;
  justify-content: center;
  padding-left: 20rpx; /* 调整文字与左边的间距 */
  padding-right: 20rpx; /* 调整文字与右边的间距 */
}

	
	.beizhu {
		font-size: 26rpx;
		color: #7c7c7c;
	}
	
	
	.lianjie {
		font-size: 26rpx;
		color: #5500ff;
	}
	
	.jieshao {
		font-size: 26rpx;
		color: #00007f;
		font-weight: bold; 
	}
	
	.gaoliang {
		font-size: 30rpx;
		color: #0000f4;
		font-weight: bold; 
	}
	.bold2 {
		
		color: #00007f;
		font-weight: bold; 
	}
	

	.bold {
		
		color: #6c4ad1;
		font-weight: bold;
		display: flex;  /* 使用Flex布局 */
		  justify-content: center;  /* 水平居中 */
		  font-size: 40rpx;
		  align-items: center; /* 垂直居中 */
	}



	.center {
		display: flex;  /* 使用Flex布局 */
		  justify-content: center;  /* 水平居中 */
		  align-items: center; /* 垂直居中 */
		
	}
	
	
	
	
</style>